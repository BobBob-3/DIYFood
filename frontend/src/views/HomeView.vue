<template>
<head>
  <link rel="stylesheet" href="css/style.css">

</head>
<body>
    <div class="home">
    <header class="masthead">
        <div class="container">
            <div class="masthead-subheading">"집밥김선생"에 오신걸 환영합니다!</div>
            <div class="masthead-heading text-uppercase">It's Nice To Meet You</div>
            <a class="btn btn-primary btn-xl text-uppercase margin-space" href="#MealPlan">더 알아보기</a>
        </div>
    </header>
    <HelloWorld></HelloWorld>
  </div>
</body>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style>
@import "../css/styles.css";
.margin-space {
  margin-top: 60px;
}
</style>
