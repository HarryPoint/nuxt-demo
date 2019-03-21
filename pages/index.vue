<template>
  <section class="container">
    key	SSH key path	String	$HOME/.ssh
    user	SSH user	String	 
    host	SSH host	[String]	 
    ssh_options	SSH options with no command-line flag, see ‘man ssh’	String or [String]	 
    ref	GIT remote/branch	String	 
    repo	GIT remote	String	 
    path	path in the server	String	 
    pre-setup	Pre-setup command or path to a script on your local machine	String	 
    post-setup	Post-setup commands or path to a script on the host machine	String	 
    pre-deploy-local	pre-deploy action	String	 
    post-deploy	post-deploy action
    <img 
      src="./images/a.png" 
      alt="">
    <div class="test"/>
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
  .test {
    width: 100px;
    height: 100px;
    background: url('./images/a.png');
  }
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
