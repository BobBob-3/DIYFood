<template>
    <body>
      <!-- MealPlan-->
        <section class="page-section" id="MealPlan">
          <div class="container">
            <div class="text-center">
              <a href="/mealplan">
                  <h2 class="section-heading text-uppercase">Meal Plan</h2>
              </a>
            </div>
            <div class="row text-center">
                <div class="col-md-4">
                    <span class="fa-stack fa-4x">
                        <a href="/mealplan">
                            <img src="https://cdn-icons-png.flaticon.com/512/561/561611.png" alt="MealPlan" style="width: 120px; height: 120px;">
                        </a>
                    </span>
                    <h4 class="my-3">식단 계획하기</h4>
                    <p class="text-muted">설정된 예산에 맞춰 건강하고 신선한 식단을 추천합니다.</p>
                </div>
            </div>
            <div class="row">
                <div class="mb-4">
                    <!-- MealPlan Banner-->
                    <div class="MealPlan-Banner"  style="text-align : center;">
                        <img src="@//assets/mealplan_banner.png" alt="" style="max-width: 50%; height: auto;">
                    </div>
                </div>
            </div>
          </div>
        </section>
        <!-- Recipe-->
        <section class="page-section bg-light" id="Recipe">
            <div class="container">
                <div class="text-center">
                    <a href="/recipe">
                        <h2 class="section-heading text-uppercase">Recipe</h2>
                    </a>
                </div>
                <div class="row text-center">
                    <div class="col-md-4">
                        <span class="fa-stack fa-4x">
                            <a href="/recipe">
                                <img src="https://cdn-icons-png.flaticon.com/512/3565/3565418.png" alt="MealPlan" style="width: 120px; height: 120px;">
                            </a>
                        </span>
                        <h4 class="my-3">레시피</h4>
                        <p class="text-muted">요리법 목록과 검색 기능을 제공합니다.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="mb-4">
                        <!-- Recipe item 1-->
                        <div class="Recipe-item" style="text-align : center;">
                            <img src="@/assets/recipe_banner.png" alt="" style="max-width: 70%; height: auto;">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Ingredient-->
        <section class="page-section" id="Ingredient">
            <div class="container">
                <div class="text-center">
                    <a href="/ingredient">
                        <h2 class="section-heading text-uppercase">Ingredients Price</h2>
                    </a>
                </div>
                <div class="row text-center">
                    <div class="col-md-4">
                        <span class="fa-stack fa-4x">
                            <a href="/ingredient">
                                <img src="https://cdn-icons-png.flaticon.com/512/3362/3362707.png" alt="ingredient_price" style="width: 120px; height: 120px;">
                            </a>
                        </span>
                        <h4 class="my-3">식재료 가격 정보</h4>
                        <p class="text-muted">오늘의 농축수산물 시장 가격을 안내합니다.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="mb-4">
                        <!-- Recipe item 1-->
                        <div class="Recipe-item" style="text-align : center;">
                            <img src="@/assets/ingredientprice_banner.png" alt="ingredient_price" style="max-width: 70%; height: auto;">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--Price Trend-->
        <section class="page-section bg-light" id="Trend">
            <div class="container">
                <div class="text-center">
                    <a href="price_trend.html">
                        <h2 class="section-heading text-uppercase">Price Trend</h2>
                    </a>
                </div>
                <div class="row text-center">
                    <div class="col-md-4">
                        <span class="fa-stack fa-4x">
                            <a href="price_trend.html">
                                <img src="@/assets/graph.png" alt="price_trend" style="width: 120px; height: 120px;">
                            </a>
                        </span>
                        <h4 class="my-3">시세 동향</h4>
                        <p class="text-muted">농수축산물 거래에 대한 국내 동향 정보를 제공합니다.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="mb-4">
                        <!-- Recipe item 1-->
                        <div class="Recipe-item" style="text-align : center;">
                            <img src="@/assets/Trend_banner.png" alt="price_trend" style="max-width: 50%; height: auto;">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- MyPage-->
        <section class="page-section padding" id="MyPage">
            <div class="container">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase" style="color:white ;">My Page</h2>
                    <h3 class="section-subheading " style="color: white ;">로그인 | 회원가입</h3>
                </div>
                <form id="MyPageForm">
                    <div class="row align-items-stretch mb-5">
                        <div class="text-center">
                            <button class="btn btn-primary btn-xl text-uppercase" type="button" onclick="location.href='/user/login'">Log In</button>
                            <button class="btn btn-primary btn-xl text-uppercase" type="button" onclick="location.href='/user/signup'">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        <!-- Footer-->
        <footer class="footer py-4">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-4 text-lg-start">Copyright &copy; DIY Food 2022</div>
                </div>
            </div>
        </footer>
    </body>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
/* eslint-disable */
</script>

<style>
@import "../css/styles.css";
.padding {
    padding-block: 160px;
}
</style>
  