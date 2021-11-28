<style>
  .headerbar {
    background-color: var(--glass-color-bold);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
  }
  .headerbar > a {
    float: var(--float-dir-start);
    margin: 18.5px 8px;
  }
  .headerbar-logo {
    float: var(--float-dir-start);
    margin: 4px 8px;
    height: 48px;
  }
</style>
<script>
  import logo from "./logo.png";
</script>
<main>
  <div class="headerbar">
    <img src={logo} alt="" class="headerbar-logo" />
    <a href="#">Home</a>
    <a href="#">Terms of Service</a>
    <a href="#">Report a Bug</a>
  </div>
</main>
