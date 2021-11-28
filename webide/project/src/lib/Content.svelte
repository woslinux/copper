<style>
  @keyframes slideUp {
    from {
      transform: translateY(128px);
    }
    to {
      transform: translateY(0);
    }
  }
  .content {
    position: fixed;
    left: 0;
    top: 56px;
    width: 100%;
    height: calc(100% - 56px);
  }
  .content * {
    animation: slideUp 250s var(--cubic-bezier);
  }
</style>
<script>
  import logo from "./logo.png";
  import fs from "fs";
  var webapps = null;
  fs.readdir("../webapps", {withFileTypes: true}, (error, files) => {
    if(error) {
      console.log(error);
    } else {
      webapps = files;
    }
  });
</script>
<main>
  <div class="content">
    <header>All Applications</header>
    {#each webapps as webapp}
      <div class="app-base">
        <img src={"../webapps/" + webapp.name + "/favicon.png"} alt="" />
        <p>{webapp.name}</p>
      </div>
    {/each}
  </div>
</main>
