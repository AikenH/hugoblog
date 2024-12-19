---
calendar_date: 2024-01-27
catalog: true
categories:
- AIGC-StableDiffusion
cover:
  image: /cover/cover14.jpeg
date: 2024-01-27 15:42:36
description: 'Secure and Personalize Your Web Services: A Guide to Nginx Authentication
  and Engaging Frontend Design'
lang: cn
mathjax: false
tags:
- Flask
- Nginx
thumbnail: /img/header_img/lml_bg1.jpg
title: 使用Flask和Nginx为StableDiffusion添加登录鉴权
toc: true
---

[> [!summary]+
> this article purpose is to build an authority page for stable diffusion webui using nginx & python/js. Which can publish my personal stable diffusion server. Wrote by GPT(try).

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240127161828.png)

### Introduction

In the digital age, the security and user-friendliness of web services are not just conveniences; they are necessities. Balancing robust security protocols with an engaging user experience is key to maintaining both the integrity and popularity of any online service. This blog post dives into the intricacies of securing web services using Nginx for authentication, coupled with designing an appealing frontend. Our journey begins with a practical scenario:

**publishing a stable diffusion webUI service, accessible only to an authenticated audience.**

### Setting Up Nginx for Secure Authentication

Nginx excels in serving web pages and as a reverse proxy, providing enhanced security through authentication mechanisms. Let’s explore a typical Nginx configuration for secure authentication:

- **/verify_token**: This block forwards authentication requests to a dedicated server. By excluding the request body and focusing on essential headers, it ensures that only valid, authenticated requests proceed.

```conf
location = /verify_token {
    proxy_pass http://{your_auth_server}:2424;
    proxy_pass_request_body off;
    proxy_set_header Content-Length "";
    proxy_set_header X-Original-URI $request_uri;
    proxy_set_header X-Original-Remote-Addr $remote_addr;
    proxy_set_header X-Original-Host $host;
}
```

- **/login**: Catering to login requests, this configuration forwards the necessary details to the authentication server, preserving crucial information about the request's origin.

```conf
location /login {
    proxy_pass http://{your_auth_server}:2424;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

- **Error Handling (@error401)**: A clever redirect mechanism that guides unauthenticated users to the login page, keeping the original URL intact.

```conf
location @error401 {
    return 302 {your_domain}/login;
}
```

- **Root Location (/)**: The gateway to your service, which rigorously checks each request for authentication, granting access only to verified users.

```conf
location / {
    auth_request /verify_token;
    error_page 401 = @error401;
    proxy_pass http://{your_server}:2323/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

This setup not only fortifies your service against unauthorized access but also maintains a seamless user experience, redirecting unauthenticated users without hassle.



### Implementing JWT for Robust Backend Authentication

Implementing JWT (JSON Web Tokens) in a Flask web application provides a secure way of handling authentication. The provided Flask code demonstrates how JWT can be integrated for a robust backend authentication system:

1. **Setup and Environment Variables**:
	- The Flask app is configured with a secret key, essential for JWT encoding and decoding.

```python
from flask import Flask
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')
```

1. **Login Route**:
	- The `/login` route handles user authentication. Upon successful login, a JWT is encoded with the user's information and expiration time, then sent as a cookie.

```python
@app.route('/login', methods=['POST', 'GET'])
def login():
    count = update_visit_count()
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Validate credentials (use a secure method in production)
        if username == os.getenv('chat_username') and password == os.getenv('password'):
            token = jwt.encode({
                'user': username,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
            }, app.secret_key, algorithm='HS256')

            response = make_response(redirect('/'))
            response.set_cookie('token', token, max_age=1800)  # Keep login status for 30 mins
            return response
        
        error = 'Invalid credentials'
        return render_template('login.html', error=error, count=count), 401
    
    # Show login page
    return render_template('login.html',count=count)
```

1. **Token Verification**:
	- A decorator `token_required` is used to verify the JWT token in subsequent requests. This ensures that only authenticated users can access certain routes.

```python
def token_required(f):
    def decorator(*args, **kwargs):
        token = request.cookies.get('token')
        if not token:
            print('token is none')
            return redirect('/login')
        try:
            jwt.decode(token, app.secret_key, algorithms=['HS256'])
        except:
            print('token is invalid')
            return redirect('/login')
        return f(*args, **kwargs)
    decorator.__name__ = f.__name__
    return decorator
```

1. **Token Validation Endpoint**:
	- The `/verify_token` endpoint checks the validity of the token, which is essential for integrating with the Nginx authentication mechanism.

```python 
@app.route('/verify_token')
def verify_token():
    token = request.cookies.get('token')
    if not token:
        return 'Access Denied', 401

    try:
        jwt.decode(token, app.secret_key, algorithms=['HS256'])
        return 'Authorized', 200
    except:
        return 'Access Denied', 401
```

1. **Dynamic Secret Key Update**:
	- A function `update_secret_key_in_env` is included to update the secret key daily, enhancing security by invalidating old tokens.

```python 
# Function to generate a new secret key and write it to the .env file
def update_secret_key_in_env():
    env_file_path = '.env'
    secret_key = f'SECRET_KEY={secrets.token_urlsafe(32)}'
    last_updated = f'LAST_UPDATED={datetime.datetime.now().strftime("%Y-%m-%d")}'
    key_updated = False

    # Check if .env file exists and read the content
    if os.path.exists(env_file_path):
        with open(env_file_path, 'r') as file:
            lines = file.readlines()

        # Update or add SECRET_KEY and LAST_UPDATED
        for i, line in enumerate(lines):
            if 'LAST_UPDATED' in line:
                last_updated_date = line.strip().split('=')[1]
                if last_updated_date != datetime.datetime.now().strftime("%Y-%m-%d"):
                    lines[i] = last_updated + '\n'
                    key_updated = True
            elif 'SECRET_KEY' in line:
                if key_updated is True:
                    lines[i] = secret_key + '\n'
                else:
                    print("no need to update the secret key today")
                key_updated = True

        # If SECRET_KEY or LAST_UPDATED are not found, add them
        if not key_updated:
            lines.append(last_updated + '\n')
            lines.append(secret_key + '\n')
            key_updated = True

        # Write back to .env file
        with open(env_file_path, 'w') as file:
            file.writelines(lines)

    else: # If .env file doesn't exist, create one
        with open(env_file_path, 'w') as file:
            file.writelines([last_updated + '\n', secret_key + '\n'])
        key_updated = True

    if key_updated:
        print("Secret key and last updated date added/updated in .env file.")
    else:
        print("No update required for today.")

```

1. **Visitor Count Feature**:
	- As part of the user experience, a visitor count is maintained, which is updated with each visit.

```python 
def update_visit_count():
    try:
        with open("visit_count.txt", "r") as file:
            count = int(file.read())
        with open("visit_count.txt", "w") as file:
            count += 1
            file.write(str(count))
        return count
    except IOError:
        return "Error"
```

This implementation of JWT in a Flask application exemplifies a secure and efficient way of handling user authentication, ensuring that only authorized users can access protected services.

![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240127161720.png)

### Designing a User-Friendly Frontend

In tandem with robust backend security, the frontend of your web service plays a crucial role in user engagement and satisfaction. Let's delve into the key features of our project's frontend design:

**Theme Toggle and Slogan**:
- The theme switcher allows users to choose between dark and light modes.

```html
<div class="theme-switch-wrapper">
    <button id="theme-toggle" class="theme-toggle">
        <span class="moon">&#9790;</span>
        <span class="sun">&#9728;</span>
    </button>
</div>
```

- A catchy slogan is displayed, setting a creative and visionary tone.

```html
<div class="slogan">Crafting Tomorrow's Narratives, Today.</div>
```

**Login Interface**: 
The entry point of any web service, the login page, is where security meets user experience. Our Flask-based web application presents a clean and intuitive login interface. It includes fields for username and password and a login button. This simplicity ensures ease of use while maintaining a professional appearance.

```html
<form action="/login" method="post">
    <input type="email" placeholder="Username" name="username" required>
    <input type="password" placeholder="Password" name="password" required>
    <button type="submit">Login</button>
</form>
```

- Additional subtitle for contextual information.

```html
<p class="subtitle">If you want to reach this server, please contact Aiken or Metis.</p>
```

**Interactive Error Handling**:

- A unique error message display using a cat image, adding a touch of humor.

```html
{% if error %}
    <div class="error-cat">
        <img src="{{ url_for('static', filename='images/cat.webp') }}" alt="Cat">
        <div class="speech-bubble">{{ error }}</div>
    </div>
{% endif %}
```


**Footer with Visitor Count**:

- Displaying the visitor count adds an interactive and transparent element.

```html
<footer>
    This page has been visited {{ count }} times.
</footer>
```


![image.png](https://picture-bed-001-1310572365.cos.ap-guangzhou.myqcloud.com/3070PC/20240127161058.png)

### Comparing Authentication Methods: JWT, OAuth, and Basic Authentication

In the realm of web security, selecting the right authentication method is crucial. Let's compare JWT (JSON Web Tokens), OAuth, and Basic Authentication to understand their unique features and use cases:

1. **JWT (JSON Web Tokens)**:
    
    - **Mechanism**: Encoded tokens that carry claims and are used for secure data exchange.
    - **Use Cases**: Ideal for single sign-on (SSO) and stateless applications.
    - **Pros**: Highly flexible, supports cross-domain requests, and is self-contained with payload data.
    - **Cons**: Requires careful management of secret keys and token expiration.
2. **OAuth**:
    
    - **Mechanism**: An authorization framework allowing applications to secure designated access without revealing user credentials.
    - **Use Cases**: Best for third-party access (like social logins) and granting limited access to user data.
    - **Pros**: Enhanced security as user credentials are not exposed, and allows token-based access control.
    - **Cons**: Complex implementation and requires understanding of tokens and scopes.
3. **Basic Authentication**:
    
    - **Mechanism**: A simple authentication scheme built into the HTTP protocol using username and password.
    - **Use Cases**: Suitable for simple login needs, especially when accessing APIs for internal use.
    - **Pros**: Easy to implement and understand.
    - **Cons**: Less secure as it sends credentials in base64 encoded format, vulnerable to interception.

Each of these methods has its strengths and weaknesses, and the choice largely depends on the specific requirements of your web application.

### Conclusion: Balancing Security and User Experience in Web Services

As we conclude this journey through securing and personalizing web services, it's clear that the right blend of backend security and frontend design can significantly enhance both the security and user experience of a web application.

From implementing robust JWT authentication in a Flask application to designing an engaging and intuitive frontend, each aspect plays a pivotal role in delivering a seamless and secure user experience. Whether it's the compact and scalable nature of JWTs, the interactive and user-friendly design elements on the frontend, or the comparative analysis of different authentication methods, each component contributes to a comprehensive web service solution.

For small projects, especially, the choice of JWT stands out for its efficiency, scalability, and ease of implementation, making it a wise choice for developers looking to secure their applications without compromising on performance or user experience.

In the end, the key takeaway is that security and usability do not have to be at odds; with the right tools and approaches, they can complement each other to create web services that are not only secure but also enjoyable to use.

We encourage our readers to explore the code and concepts discussed in this blog post and to visit the GitHub repository for the original code at [ezEncryptYourService](https://github.com/AikenH/ezEncryptYourService?tab=readme-ov-file). Dive in, experiment, and elevate your web services to new heights of security and user engagement.