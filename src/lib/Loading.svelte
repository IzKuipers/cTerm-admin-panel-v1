<script lang="ts">
    export let capt = "Loading";
</script>

<span class="loading">{capt}<span class="dots" /></span>

<style scoped>
  span.loading span:before {
    animation: dots 0.5s linear infinite;
    content: "";
  }

  @keyframes dots {
    0%,
    20% {
      content: ".";
    }
    40% {
      content: "..";
    }
    60% {
      content: "...";
    }
    90%,
    100% {
      content: "";
    }
  }
</style>
