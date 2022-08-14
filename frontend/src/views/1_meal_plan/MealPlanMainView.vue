<template>
  <body id="page">
    <div style="margin-top: 30px;">
      <p style="text-align: center; font-size:4em; font-weight:500;">
        MEAL PLAN
      </p>
      <p style="text-align: center; font-size:1.5em; font-weight:400;">
        설정된 예산에 맞춰 건강하고 신선한 식단을 추천합니다.
      </p>
    </div>
    <div style="text-align: center;">
      <section id="content-box">
        <img src="@/assets/check-list.png" alt="">
      </section>
      <section id="content-box">
      </section>
      <section id="content-box">
      </section>
    </div>
  </body>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      sampleData: ''
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>

<style>
#content-box{
  float: left;
  width: 300px;
  height:fit-content ;
  background-color:white;
  margin-right: 50px;
  margin-top: 10px;
  margin-bottom: 50px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px 5px lightgray;
  padding: 50px;
  padding-bottom: 10px;
}
</style>
