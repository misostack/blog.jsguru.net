---
title: "001 Create Static Blog With Hugo and Github Pages in 5 Minutes"
type: "post"
date: 2022-06-21T15:43:50+07:00
description: "001 Create Static Blog With Hugo and Github Pages in 5 Minutes"
keywords: ["001 Create Static Blog With Hugo and Github Pages in 5 Minutes"]
categories: ["default"]
image: "/common/no-image.png"
---

## Todo

### [x] Download hugo releases for windows 10

- https://gohugo.io/getting-started/installing/
- Extract and copy hugo.exe to your HUGO_PATH
- Add your HUGO_PATH to environment path. Window Icon + 'env' => Edit System Variables

Eg: C:/softwares/hugo

![image](https://user-images.githubusercontent.com/31009750/174746924-deab0f6a-bef5-4241-b5ad-f615a6e30120.png)
Open system environment variable
![image](https://user-images.githubusercontent.com/31009750/174747049-c0669277-1a70-4d75-828e-3e532919c9df.png)
Add new hugo path
![image](https://user-images.githubusercontent.com/31009750/174747136-5b20623d-ff18-4c7a-915e-128337ef2f52.png)
Add hugo path to path
![image](https://user-images.githubusercontent.com/31009750/174747330-c11e93a5-d303-49e6-90cb-df9a03b31824.png)
Test

```bash
hugo --help
```

### [x] Create new hugo site

```bash
hugo new site blog.jsguru.net --force
```

### [x] Install new theme

### [x] Add new post

```
hugo new [archtype]/[post-name].md "Post title"
```

- [ ] Add your github page
- [ ] Config DNS
- [ ] Test
- [ ] Add new post
