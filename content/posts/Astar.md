---
calendar_date: 2021-09-28
catalog: true
categories:
- Algorithm
cover:
  image: /cover/cover1.jpeg
date: 2021-09-28 05:34:21
lang: cn
mathjax: true
subtitle: A*算法，最短寻路算法，Dijkstra的变体的Py实现
tags:
- Algorithm
thumbnail: /img/header_img/lml_bg1.jpg
title: 寻路算法 Aster
toc: true
---

A* 是一种在平面图形上计算最优路径的方法，通常用来做 2D 游戏的最短寻路，该算法是一种 Dijkstra 算法的变体，使用启发式的策略来提高算法的搜索效率。

[wikipedia](https://zh.wikipedia.org/wiki/A*%E6%90%9C%E5%B0%8B%E6%BC%94%E7%AE%97%E6%B3%95)；[medium](https://medium.com/@nicholas.w.swift/easy-a-star-pathfinding-7e6689c7f7b2)；[pythonf](https://www.pythonf.cn/read/123915)


## 基本思想

基于启发式的方法，基于BFS去做最短路径搜索，借助类似Manhattan距离作为启发，每次加入后续的多个点，然后按照后续点的属性去排序，不断的加入close的区间，直到第一次遍历到终点就是最短的路径。

 
<div>
$$ f(n) = g(n) + h(n) $$
</div>
 

f代表的是经过当前点，从起点到最终点的距离，g代表的是从起点到当前节点的距离，h代表的是启发式方法到终点的距离。

维护三个list：open(候选列表)、close（状态确定的列表）、children（等待操作的列表）

首先用 bfs 的方法，找到当前节点的可达后续节点，将这些节点加入 children，确定 child 不在 close_list 中后（即在 open 中）则判断哪个是最优解，然后更新 openlist 和 closelist 。

即：每次遍历的当前节点都从 open 中总距离最小的选，然后放入 close。直到 openlist 为空。



### 相关类别定义

```python
class node(): 
    def __init__(self, parent=None, position=None):
        self.parent = parent
        self.position = position

        self.g = 0 
        self.h = 0 
        self.f = 0 
    
    def __eq__(self, o: object) -> bool:
        return o.position == self.position
```

### 具体代码实现

```python
def asterS(map,slope,start,end):
    # 在astar算法的基础上，我们需要加入的是高度的约束
    # 阻碍的条件是高度不同同时没有slope的存在，这种就是wall
    # 其余的和Astar算法应该是一样的

    # init the start and end node
    start_node = node(None,start)
    end_node = node(None,end)

    # init the open and closed lists
    open_list = []
    close_list = []

    # add the start node to the open list
    open_list.append(start_node)

    # loop util find the end_node 
    while len(open_list)>0:
        # make the best node as current_node
        # init 1 
        current_node = open_list[0]
        current_index = 0
        for index, nod in enumerate(open_list):
            if nod.f<current_node.f:
                current_node = nod
                current_index = index
        
        # pop the curr node off open list, add to close list 
        open_list.pop(current_index)
        close_list.append(current_node)

        # terminal conditions (reach the end node )
        if current_node == end_node:
            path = []
            while(current_node is not None):
                path.append(current_node.position)
                current_node = current_node.parent

            # return the path we find.
            return path[::-1]
        
        # the body of the loop: update the nodes
        # find the available children nodes
        children = []

        # define the adjacent squares 
        positions = [(-1,0),(1,0),(0,-1),(0,1)]
        for pos in positions:
            # get childrens positions
            node_pos = (current_node.position[0]+pos[0], current_node.position[1]+pos[1])
            
            # make sure within range  
            if node_pos[0] < 0 or node_pos[0] >= map.shape[0] or node_pos[1] < 0 or node_pos[1] >= map.shape[1]:
                continue

            # mkae sure walkab
            mapflag = map[current_node.position[0], current_node.position[1]] != map[node_pos[0], node_pos[1]]
            slopeflag1 = slope[node_pos[0], node_pos[1]] == 0  or slope[current_node.position[0], current_node.position[1]] == 0
            slpopeflag2 = slope[node_pos[0], node_pos[1]] != slope[current_node.position[0], current_node.position[1]]
            
            if mapflag and (slopeflag1 or slpopeflag2):
                continue

            # we need creat node first to find out if it is in the openlist or closed list
            new_node = node(current_node, node_pos)
            children.append(new_node)
        
        # loop those children
        # using the __eq__ to judge if it's already traveled.
        for child in children:
            if child in close_list:
                continue
            
            # create f,g,h for the legal child
            child.g = current_node.g + 1 
            child.h = manhattan(child.position, end_node.position)
            child.f = child.g + child.f

            # if the child is already in the open list, compare it
            if child in open_list:
                open_index = open_list.index(child)
                open_node = open_list[open_index] 
                if child.g > open_node.g:
                    continue
                open_list.pop(open_index)
            # if it is not in the open/closelist or better than that in open list, we add it.
            open_list.append(child)
```