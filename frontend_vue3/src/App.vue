<template>
<div>
  <!-- MENU BAR -->
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>집밥김선생</title>
    <!-- Google fonts-->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav" style="background-color: rgb(30, 30, 30);">
      <div class="container">
        <a class="navbar-brand" href="/"><img src="@/assets/logo_white.png" alt="집밥김선생" style="width:210px; height:70px;"/></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
          <i class="fas fa-bars ms-1"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                <li class="nav-item"><a class="nav-link" href="/mealplan">Meal Plan</a></li>
                <li class="nav-item"><a class="nav-link" href="/recipe">Recipe</a></li>
                <li class="nav-item"><a class="nav-link" href="/#Groceries">Grocery Price</a></li>
                <li class="nav-item"><a class="nav-link" href="/#Trend">Price Trend</a></li>
                <li class="nav-item"><a class="nav-link" href="/#MyPage">My Page</a></li>
            </ul>
        </div>
      </div>
    </nav>
  </body>
<router-view></router-view>
</div>

</template>

<script>
</script>

<style>
@import "css/styles.css";
</style>
