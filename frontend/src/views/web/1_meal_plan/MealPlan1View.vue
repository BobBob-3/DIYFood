<template>
  <body id="page">
    <div>
      <div>
        <!-- Side -->
          <div id="side">
            <div style="margin-top: 30px; " id="head">
              <h1>
                이번주 뭐 먹지?
              </h1>
            </div>
            <div style="text-align: center;">
              <img src="https://cdn-icons-png.flaticon.com/512/1039/1039328.png" alt="식단계획1" height="50%" width="50%">
          </div>
          <div style="margin-top: 30px; text-align: center;">
            <h4>1. 조건 설정</h4>
            </div>
          </div>
        <!-- Content -->
        <section id="content">
          <div style="text-align:center;">
            <h1>기간 및 예산 설정</h1>
            <p>식재료 선택과 레시피 추천을 위해 몇가지 조건을 설정합니다. </p>
          </div>
          <div id="mealplan" style="margin-top: 40px; font-size:1.15rem">
            <div>
              <p style="font-size:1.3rem">1. 일주일 식재료 예산을 설정해주세요.</p>
              <label class="margin_left">
                <input type="number" min="1" max="30" v-model="budget">  만원 이내
                <span style="margin-left:5px; color: gray;">(1인분 기준)</span>
              </label>
              <p></p>
              <div style="display:inline-block">
                <p style="font-size:1.3rem">2. 기간을 설정해주세요.</p>
                <div style="margin-left:10px; float: left;">
                  <date-picker
                    inline
                    :editable="false"
                    valueType="format"
                    format="YYYY-MM-DD"
                    :getClasses="getClasses"
                    :lang="datepickerLang"
                    :value="weekTime"
                    :disabled-date="dislabedDate"
                    @pick="calendarPick"
                  />
                  <div style="float: right">
                    <p class="margin_left">기간은 <strong>일주일</strong>기준으로 설정할 수 있습니다.
                    <br>식재료 가격은 <strong>현재 시장 가격</strong>을 기준으로 계산됩니다.</p>
                    <p class="margin_left">선택 기간 : {{ dateRange.start }} - {{ dateRange.end }}</p>
                  </div>
                </div>
              </div>
              <p></p>
              <div>
                <p style="font-size:1.3rem">3. 지역을 설정해주세요.</p>
                <select class="margin_left">
                    <option value="seoul">서울</option>
                </select>
                <span style="margin-left:5px; color: gray;">(서울 외 지역은 추후 지원 예정입니다.)</span>
              </div>
              <div style="text-align:center;" >
                <a href="/mealplan/step2">
                  <button class="btn btn-primary btn-lg next-button text-uppercase" @click="submitSetting()">NEXT</button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div>
        <button class="btn-up" @click="upClick()"><img src="https://cdn-icons-png.flaticon.com/512/130/130906.png" width="20px"></button>
        <button class="btn-down" @click="downClick()"><img src="https://cdn-icons-png.flaticon.com/512/130/130907.png" width="20px"></button>
    </div>
  </body>
</template>

<script>
/* eslint-disable */
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";

export default {
  components: { DatePicker },
  data () {
    return {
      budget: 1,
      date: '',
      weekTime: null,
      dateRange: {
        start: null,
        end: null,
      },
      datepickerLang: {
        yearFormat: "YYYY년",
        monthFormat: "M월",
        monthBeforeYear: false,
      },
    }
  },
  setup () {},
  created () {},
  mounted () {},
  unmounted () {},
  methods: {
    // localStorage에 조건값 저장
    submitSetting () {
      localStorage.setItem('budget', this.budget + '0000') // 식재료 선택 때 필요
      localStorage.setItem('date_start', this.dateRange.start) // 식단 계획 완성 때 필요
      localStorage.setItem('date_end', this.dateRange.end)
    },
    getClasses(cellDate, currentDates) {
      if (currentDates.length === 0) return;
      //기준 날짜
      const cellDateVal = moment(cellDate).format("YYYY-MM-DD");
      // 주 시작일 날짜
      const startWeekDay = moment(currentDates[0])
        .startOf("week")
        .format("YYYY-MM-DD");
      // 주 종료일 날짜
      const endWeekDay = moment(currentDates[0])
        .endOf("week")
        .format("YYYY-MM-DD");
      
      // 주 시작점 & 종료점 class
      if (cellDateVal === startWeekDay || cellDateVal === endWeekDay) {
        return "active";
      }
      // 중간영역 class
      if (
        moment(cellDateVal).isAfter(startWeekDay) &&
        moment(cellDateVal).isBefore(endWeekDay)
      ) {
        return "in-range";
      }
    },
    // 캘린더 비활성화 영역 - 당일 주를 포함하여 선택 가능
    dislabedDate(date) {
      return (
        moment(date).format("YYYY-MM-DD") <
        moment()
          .startOf("week")
          .format("YYYY-MM-DD")
      );
    },
    calendarPick(item) {
      this.weekTime = moment(item).format("YYYY-MM-DD");
      // 선택한 날짜의 주 첫째일과 마지막일 date set - 첫째일을 일요일로 설정
      this.dateRange.start = moment(item)
        .startOf("week")
        .format("YYYY-MM-DD");
      this.dateRange.end = moment(item)
        .endOf("week")
        .format("YYYY-MM-DD");
    },
    upClick () {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    downClick () {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
  }
}
</script>
<style>
  @import "@/css/styles.css";
  body{background: #f3f3f3;}
  #page{padding-top: 120px;}
</style>