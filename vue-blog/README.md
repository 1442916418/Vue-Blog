# vue-blog

> vue blog

## 部署

``` bash
# 安装依赖
npm install

# 本地主机运行
npm run dev

# 项目打包
npm run build
```

########### 前端目录结构描述  
├─build                                   // webpack 打包配置
├─config                                  // 项目配置
├─node_modules                            // 模块目录配置
├─src                                     // 项目源码目录
    │  App.vue                            // 根组件
    │  main.js                            // 入口 js 文件
    │  
    ├─assets                              // 图片资源目录
    │      
    ├─back                                // 后台管理目录
    │  │  administration.vue              // 后台管理主页组件
    │  │  aside.vue                       // 侧边栏组件
    │  │  footer.vue                      // 页脚组件
    │  │  header.vue                      // 页眉组件
    │  │  main.vue                        // 内容组件
    │  │  
    │  ├─article                          // 后台文章管理目录
    │  │      addArticle.vue              // 增加文章组件
    │  │      articleManagement.vue       // 文章主页组件
    │  │      updateArticle.vue           // 更新文章组件
    │  │      
    │  ├─backstageUserInfo                // 后台用户管理目录
    │  │      backstageUserInfo.vue       // 后台用户主页组件
    │  │      
    │  ├─charts                           // 后台图表管理目录
    │  │      barSimple.vue               // 柱状图组件
    │  │      basicLineChart.vue          // 折线图组件
    │  │      doughnutChart.vue           // 饼图组件
    │  │      stackedAreaChart.vue        // 堆叠折线图组件
    │  │      
    │  └─userInfo                         // 前台用户管理目录
    │          userInfoPage.vue           // 前台用户主页组件
    │          
    ├─components                          // 前台管理目录
    │      articleDetails.vue             // 文章详情组件
    │      articleList.vue                // 文章列表组件
    │      aside.vue                      // 侧边栏组件
    │      contact.vue                    // 联系组件
    │      displayPage.vue                // 主页显示内容组件
    │      footer.vue                     // 页脚组件
    │      github.vue                     // Github 组件
    │      header.vue                     // 页眉组件
    │      home.vue                       // 主页组件
    │      login.vue                      // 前台登录组件
    │      main.vue                       // 前台主页组件
    │      register.vue                   // 前台注册界面
    │      rearLogin.vue                  // 后台登录组件
    │      rearRegister.vue               // 后台注册组件
    │      
    ├─publicJs                            // 公共 js 管理目录
    │      dateFormat.js                  // 时间戳
    │      
    └─router                              // 路由管理目录
        index.js                          // 主路由
├─static                                  // 静态路由管理目录
├─.babelrc
├─.editorconfig
├─.gitignore
├─.postcssrc.js
├─index.html                              
├─package-lock.json
├─package.json
├─README.md
├─vue-blog.md


########### 后端接口描述
__所有端口前缀：http://127.0.0.1/cgi-bin__

> 三张数据表
> userInfo  前台用户表
> backstage_login  后台用户表
> article  文章表

**1、前台用户信息表接口**  
接口：cgi-bin/userInfo_select_all.py  
提交参数：无  
返回结果：  

|  内容 | 描述  |
| ------------ | ------------ |
| 所有用户Json数据  | 获取成功  |
|  error  | 获取失败  |

**2、前台增加一条用户信息表接口**  
接口：cgi-bin/userInfo_insert.py  
提交参数：  

|  内容  |  描述  |  要求  |
| ------------ | ------------ | ------------ |
|  loginName  |  登录名  |  必须 不能为空 3-10个中文字符、英文字母、数字及下划线 |
|  loginPwd  | 登录密码  |  必须 不能为空 3-6个数字、英文字母  |  
|  name  |  昵称  |  必须 不能为空 3-10个中文字符、英文字母、数字及下划线  |
|  subTitle  | 副标题  |  必须 不能为空 最多20字符  |
|  createionTime |  创建时间  | 必须 不能为空 格式为 yyyy-dd-mm hh : mm : ss  |

返回结果：

|  内容 | 描述  |
| ------------ | ------------ |
| success  | 增加成功  |
|  error  | 增加失败  |


**3、前台删除一条用户信息表接口**  
接口：cgi-bin/userInfo_delete.py  
提交参数：  

|  内容  |  描述  |  要求  |
| ------------ | ------------ | ------------ |
| id  | 用户id  |  必须 不能为空 必须是数字  |

返回结果：

|  内容 | 描述  |
| ------------ | ------------ |
| success  | 删除成功  |
|  error  | 获取失败  |

**4、前台修改一条用户信息表接口**  
接口：cgi-bin/userInfo_update.py  
提交参数：  

|  内容  |  描述  |  要求  |
| ------------ | ------------ | ------------ |
|  loginName  | 用户名  |  必须 不能为空 3-10个中文字符、英文字母、数字及下划线  |
|  loginPassword  | 密码  | 必须 不能为空 3-6个数字、英文字母 |
|  name  |  昵称  |  必须 不能为空 3-10个中文字符、英文字母、数字及下划线  |
|  subTitle  | 副标题  |  必须 不能为空 最多20字符  |
|  lastModificationTime |  修改时间  | 必须 不能拿为空 格式为 yyyy-dd-mm hh : mm : ss  |
|  id  |  用户id  |  必须 不能为空  |

返回结果：  

|  内容 | 描述  |
| ------------ | ------------ |
|  success  | 获取成功  |
|  error  | 获取失败  |

===

**1、获取所有文章信息表接口**  
接口：cgi-bin/article_all.py  
提交参数：无  
返回结果：  

|  内容 | 描述  |
| ------------ | ------------ |
| 所有用户json数据  | 获取成功  |
|  error  | 获取失败  |

**2、后台增加一条文章信息表接口**  
接口：cgi-bin/article_insert.py  
提交参数：  

|  内容  |  描述  |  要求  |
| ------------ | ------------ | ------------ |
|  title  |  标题  |  必须 不能为空 中文字符、英文字母、数字 不能超过30字符|
|  content  | 内容  |  必须 不能为空  |
|  releaseTime  |  创建时间  | 必须 不能为空 格式为 yyyy-dd-mm hh : mm : ss |

返回结果：  

|  内容 | 描述  |
| ------------ | ------------ |
|  success  | 增加成功  |
|  error  | 增加失败  |

**3、后台删除一条文章信息表接口**  
接口：cgi-bin/article_delete.py  
提交参数：  

|  内容  |  描述  |  要求  |
| ------------ | ------------ | ------------ |
| id  | 文章id  | 必须 不能为空 必须是数字  |

返回结果：  

|  内容 | 描述  |
| ------------ | ------------ |
|  success  | 删除成功  |
|  error  | 删除失败  |

**4、后台修改一条文章信息表接口**  
接口：cgi-bin/article_update.py  
提交参数：  

|  内容  |  描述  |  要求  |
| ------------ | ------------ | ------------ |
| title  |  标题  |  必须 不能为空 不能超过30字符  |
| content  |  内容  |  必须 不能为空  |
| modificationTime  | 修改时间  |  必须 不能为空 格式为 yyyy-dd-mm hh : mm : ss  |
| id  | 文章id  | 必须 不能为空  |  

返回结果：  

|  内容 | 描述  |
| ------------ | ------------ |
|  success  | 修改成功  |
|  error  | 修改失败  |

**5、后台增加文章阅读数量接口**  
接口：cgi-bin/article_update_readingVolume.py
提交参数：

|  内容  |  描述  |  要求  |
| ------------ | ------------ | ------------ |
|  readingVolume  |  阅读量  |  必须 不能为空  |
|  id  |  文章id  |  必须 不能为空  |

返回结果：

|  内容 | 描述  |
| ------------ | ------------ |
|  success  | 增加成功  |
|  error  | 增加失败  |

**6、后台分页查询或按条件查询所有文章信息表接口**  
接口：cgi-bin/article_select_all_page.py  
提交参数：  

|  内容  |  描述  |  要求  |
| ------------ | ------------ | ------------ |
|  id  | 文章id  |  可选  |
|  title  |  标题  |  可选  |
|  readingVolume  |  阅读数  |  可选  |
|  startDate  |  开始时间  |  可选  |
|  endDate  |  结束时间  |  可选  |
|  pageNum  |  页码  |  可选  |
|  isConvertFormat  |  内容是否转换成字符串  |  可选 若有值就转换成字符串(任意值)，反之没有(不设置就不转换)  |  

返回结果：  

|  内容 | 描述  |
| ------------ | ------------ |
|  查询到的json数据  |  查询成功  |
|  error  |  查询失败  |  

===



**1、 后台管理员登录用户表接口**  
接口：cgi-bin/backstage_login.py  
提交参数：  

|  内容  |  描述  |  要求  |
| ------------ | ------------ | ------------ |
|  name  |  用户名  |  必须 不能为空  |
|  pwd  |  密码  |  必须 不能为空  |

返回结果：  

|  内容  | 描述  |
| ------------ | ------------ |
|  {'isOk': 'success','name': 用户名 }  |  登录成功  |
| {'isOk':'error'}  |  登录失败  |

**2、后台管理员注册表接口**    
接口：cgi-bin/backstage_reg.py  
提交参数：  

|  内容  |  描述  |  要求  |
| ------------ | ------------ | ------------ |
|  name  |  用户名  |  必须 不能为空 3-10个中文字符、英文字母、数字及下划线  |
|  pwd  |  密码  |  必须 不能为空 不能含有非法字符，长度在3-6之间  |

返回结果：  

|  内容 | 描述  |
| ------------ | ------------ |
| success  | 注册成功  |
| error  | 注册失败	|

**3、后台删除一条后台用户信息表**  
接口：cgi-bin/backstage_delete.py  
提交参数：  

|  内容  |  描述  |  要求  |
| ------------ | ------------ | ------------ |
| id  | 用户id  |  必须 不能为空  |

返回结果：  

|  内容 | 描述  |
| ------------ | ------------ |
|  success  | 删除成功  |
|  error  | 删除失败  |

**4、后台修改一条后台用户信息表**  
接口：cgi-bin/backstage_update.py  
提交参数：  

|  内容  |  描述  |  要求  |
| ------------ | ------------ | ------------ |
|  name  |  用户名  |  必须 不能为空 3-10个中文字符、英文字母、数字及下划线  |
|  pwd  |  密码  |  必须 不能为空   不能含有非法字符，长度在3-6之间  |
|  id  | 用户id  |  必须 不能为空  |

返回结果：  

|  内容 | 描述  |
| ------------ | ------------ |
|  success  | 修改成功  |
|  error  | 修改失败  |


**5、后台获取后台用户信息表**  
接口：cgi-bin/backstage_select_all.py  
提交参数：无  
返回结果：  

|  内容 | 描述  |
| ------------ | ------------ |
|  所有用户Json数据  | 获取成功  |
|  error  | 获取失败  |