<template>
  <section class="container">
    centos 7.2 nginx https配置 - u010375456的博客 - CSDN博客
    2018年7月19日 - centos 7以上是用Systemd进行系统初始化的,Systemd服务文件以.service结尾,比如现在要建立nginx为开机启动,这里我是用源码编译安装的,所以要手动创建n...
    CSDN博客号 - 百度快照
    centos7.2下nginx安装教程 - knyel - 博客园
    2019年2月1日 - baseurl=http://nginx.org/packages/centos/7/$basearch/gpgcheck=0enabled=1 完成后保存退出 3.yum install nginx 即可安装完成 备注: 1)查看nginx编...
    https://www.cnblogs.com/knyel/...  - 百度快照
    centos7.2+php7.2+nginx1.12.0+mysql5.7配置 - 小菜鸟..._CSDN博客
    2017年12月25日 - centos7.2+php7.2+nginx1.12.0+mysql5.7配置2017年12月25日 17:13:55 小...chkconfig --add nginx 设置开机启动 chkconfig nginx on 重启查看nginx...
    CSDN博客号 - 百度快照
    CentOS 7 下配置nginx服务器根目录 - Klaus_S的博客 - CSDN博客
    2018年6月28日 - 在centos7使用nginx当作静态服务器发布文件目录 - 因为不想回家,所以还是去搬砖。 05-08 854 一.添加Nginx存储库sudo yum install epel-release二....
    CSDN博客号 - 百度快照
    CentOS7安装Nginx及配置 - jackyzm - 博客园
    2019年3月1日 - 1. CentOS7安装Nginx及配置(2239) 2. centos7安装配置zabbix4.0(555) 3. CentOS...查找安装路径: whereis nginx 启动、停止nginx cd /usr/local/nginx...
    https://www.cnblogs.com/jackyz...  - 百度快照
    CentOS7 Nginx安装及配置反向代理 - 三瑞 - 博客园
    2019年2月1日 - jexus-5.8.2-x64(《CentOS7 安装 jexus-5.8.2-x64》) VirtualBox5.1.22...查看nginx的pid:cat /usr/local/nginx/logs/nginx.pid 查看nginx版本$ ./ngi...
    https://www.cnblogs.com/xiaoru...  - 百度快照
    centOS7 安装nginx并启动 - qq_38872310的博客 - CSDN博客
    2018年4月3日 - 一、下载安装包 cd /usr/local/software (software可能没有,用mkdir创建或者只到local目录下也行) wget http://nginx.org/download/nginx-1.6.2.tar.g...
    CSDN博客号 - 百度快照
    详解基于CentOS 7配置Nginx自启动_nginx_脚本之家
    2018年3月30日 - 这篇文章主要介绍了详解基于CentOS 7配置Nginx自启动,小编觉得挺不错的,现在分享给大家,也给大家做个参考。一起跟随小编过来看看吧
    脚本之家 - 百度快照
    Linux(centOS 7.2)下nginx安装步骤 - Murphy的博客 - CSDN博客
    2018年5月28日 - 1、gcc安装 查看是否有gcc gcc -v 没有需要安装gcc,执行以下命令 yum ...2、Nginx的安装 2.1、准备工作 操作系统:centOS 6.5。 Nginx的下载地址:h...
    CSDN博客号 - 百度快照
    CentOS7.2安装Nginx的方法步骤_Linux_脚本之家
    2017年7月11日 - 本篇文章主要介绍了CentOS7.2安装 Nginx的方法步骤,具有一定的参考价值,感兴趣的小伙伴们可以参考一下。
    脚本之家 - 百度快照
    19小时搞定查看nginx配置视频课程_51XCTO学院

    与4万人一起学习查看nginx配置本课程共98节19小时，适合快速上手Nginx， 缺乏Nginx多场景实战经验，全面认知掌握Nginx，快速上手Nginx多场景配置与架构维护
    edu.51cto.com 2019-03- 评价 广告

  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: $content-width;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
