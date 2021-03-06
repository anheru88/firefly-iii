<!--
  - TopBoxes.vue
  - Copyright (c) 2020 james@firefly-iii.org
  -
  - This file is part of Firefly III (https://github.com/firefly-iii).
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program.  If not, see <https://www.gnu.org/licenses/>.
  -->

<template>
  <div class="row">
    <div class="col" v-if="0 !== prefCurrencyBalances.length && 0 !== notPrefCurrencyBalances.length">
      <div class="info-box">
        <span class="info-box-icon"><i class="far fa-bookmark text-info"></i></span>

        <div class="info-box-content">
          <span v-if="!loading && !error" class="info-box-text">{{ $t("firefly.balance") }}</span>
          <span v-if="loading && !error" class="info-box-text"><i class="fas fa-spinner fa-spin"></i></span>
          <span v-if="error" class="info-box-text"><i class="fas fa-exclamation-triangle text-danger"></i></span>
          <!-- balance in preferred currency -->
          <span v-for="balance in prefCurrencyBalances" :title="balance.sub_title" class="info-box-number">{{ balance.value_parsed }}</span>
          <span v-if="0 === prefCurrencyBalances.length" class="info-box-number">&nbsp;</span>
          <div class="progress bg-info">
            <div class="progress-bar" style="width: 0"></div>
          </div>
          <!-- balance in not preferred currency -->
          <span class="progress-description">
                        <span v-for="(balance, index) in notPrefCurrencyBalances" :title="balance.sub_title">
                          {{ balance.value_parsed }}<span v-if="index+1 !== notPrefCurrencyBalances.length">, </span>
                        </span>
                      <span v-if="0===notPrefCurrencyBalances.length">&nbsp;</span>
                    </span>
        </div>
      </div>
    </div>

    <div class="col" v-if="0!==prefBillsUnpaid.length && 0 !== notPrefBillsUnpaid.length">
      <div class="info-box">
        <span class="info-box-icon"><i class="far fa-calendar-alt text-teal"></i></span>

        <div class="info-box-content">
          <span v-if="!loading && !error" class="info-box-text">{{ $t('firefly.bills_to_pay') }}</span>
          <span v-if="loading && !error" class="info-box-text"><i class="fas fa-spinner fa-spin"></i></span>
          <span v-if="error" class="info-box-text"><i class="fas fa-exclamation-triangle text-danger"></i></span>
          <!-- bills unpaid, in preferred currency. -->
          <span v-for="balance in prefBillsUnpaid" class="info-box-number">{{ balance.value_parsed }}</span>

          <div class="progress bg-teal">
            <div class="progress-bar" style="width: 0"></div>
          </div>
          <!-- bills unpaid, in other currencies. -->
          <span class="progress-description">
                            <span v-for="(bill, index) in notPrefBillsUnpaid">
                                {{ bill.value_parsed }}<span v-if="index+1 !== notPrefBillsUnpaid.length">, </span>
                            </span>
                            <span v-if="0===notPrefBillsUnpaid.length">&nbsp;</span>
                    </span>
        </div>
      </div>
    </div>
    <!-- left to spend -->
    <div class="col" v-if="0 !== prefLeftToSpend.length && 0 !== notPrefLeftToSpend.length">
      <div class="info-box">
        <span class="info-box-icon"><i class="fas fa-money-bill text-success"></i></span>

        <div class="info-box-content">
          <span v-if="!loading && !error" class="info-box-text">{{ $t('firefly.left_to_spend') }}</span>
          <span v-if="loading && !error" class="info-box-text"><i class="fas fa-spinner fa-spin"></i></span>
          <span v-if="error" class="info-box-text"><i class="fas fa-exclamation-triangle text-danger"></i></span>
          <!-- left to spend in preferred currency -->
          <span v-for="left in prefLeftToSpend" :title="left.sub_title" class="info-box-number">{{ left.value_parsed }}</span>
          <span v-if="0 === prefLeftToSpend.length" class="info-box-number">&nbsp;</span>

          <div class="progress bg-success">
            <div class="progress-bar" style="width: 0"></div>
          </div>
          <!-- other currencies-->
          <span class="progress-description">
                            <span v-for="(left, index) in notPrefLeftToSpend">
                                {{ left.value_parsed }}<span v-if="index+1 !== notPrefLeftToSpend.length">, </span>
                            </span>
                            <span v-if="0===notPrefLeftToSpend.length">&nbsp;</span>
                    </span>
        </div>
      </div>
    </div>

    <!-- net worth -->
    <div class="col" v-if="0 !== notPrefNetWorth.length && 0 !== prefNetWorth.length">
      <div class="info-box">
        <span class="info-box-icon"><i class="fas fa-money-bill text-success"></i></span>

        <div class="info-box-content">
          <span v-if="!loading && !error" class="info-box-text">{{ $t('firefly.net_worth') }}</span>
          <span v-if="loading && !error" class="info-box-text"><i class="fas fa-spinner fa-spin"></i></span>
          <span v-if="error" class="info-box-text"><i class="fas fa-exclamation-triangle text-danger"></i></span>
          <span v-for="nw in prefNetWorth" :title="nw.sub_title" class="info-box-number">{{ nw.value_parsed }}</span>
          <span v-if="0===prefNetWorth.length">&nbsp;</span>
          <div class="progress bg-success">
            <div class="progress-bar" style="width: 0"></div>
          </div>
          <span class="progress-description">
                        <span v-for="(nw, index) in notPrefNetWorth">
                                {{ nw.value_parsed }}<span v-if="index+1 !== notPrefNetWorth.length">, </span>
                            </span>
                            <span v-if="0===notPrefNetWorth.length">&nbsp;</span>
                    </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {createNamespacedHelpers} from "vuex";
import format from 'date-fns/format';

const {mapState, mapGetters, mapActions, mapMutations} = createNamespacedHelpers('dashboard/index')
export default {
  name: "TopBoxes",
  props: {},
  data() {
    return {
      summary: [],
      balances: [],
      billsPaid: [],
      billsUnpaid: [],
      leftToSpend: [],
      netWorth: [],
      loading: true,
      error: false,
      ready: false
    }
  },
  computed: {
    ...mapGetters([
                    'start',
                    'end'
                  ]),
    'datesReady': function () {
      return null !== this.start && null !== this.end && this.ready;
    },

    // contains only balances with preferred currency.
    prefCurrencyBalances: function () {
      return this.filterOnCurrency(this.balances);
    },
    notPrefCurrencyBalances: function () {
      return this.filterOnNotCurrency(this.balances);
    },

    // contains only bills unpaid in preferred currency or first one.
    prefBillsUnpaid: function () {
      return this.filterOnCurrency(this.billsUnpaid);
    },
    notPrefBillsUnpaid: function () {
      return this.filterOnNotCurrency(this.billsUnpaid);
    },

    // left to spend
    prefLeftToSpend: function () {
      return this.filterOnCurrency(this.leftToSpend);
    },
    notPrefLeftToSpend: function () {
      return this.filterOnNotCurrency(this.leftToSpend);
    },

    // net worth
    prefNetWorth: function () {
      return this.filterOnCurrency(this.netWorth);
    },
    notPrefNetWorth: function () {
      return this.filterOnNotCurrency(this.netWorth);
    },
    currencyCode() {
      return this.$store.getters.currencyCode;
    },
    currencyId() {
      return this.$store.getters.currencyId;
    }
  },
  watch: {
    datesReady: function (value) {
      if (true === value) {
        this.prepareComponent();
      }
    },
    start: function () {
      if (false === this.loading) {
        this.prepareComponent();
      }
    },
    end: function () {
      if (false === this.loading) {
        this.prepareComponent();
      }
    },
  },
  created() {
    this.ready = true;
  },
  methods: {
    filterOnCurrency(array) {
      let ret = [];
      for (const key in array) {
        if (array.hasOwnProperty(key)) {
          // console.log('Currency ID seems to be ' + this.currencyId);
          if (array[key].currency_id === this.currencyId) {
            ret.push(array[key]);
          }
        }
      }
      // or just the first one:
      if (0 === ret.length && array.hasOwnProperty(0)) {
        ret.push(array[0]);
      }
      return ret;
    },
    filterOnNotCurrency(array) {
      let ret = [];
      for (const key in array) {
        if (array.hasOwnProperty(key)) {
          if (array[key].currency_id !== this.currencyId) {
            ret.push(array[key]);
          }
        }
      }
      return ret;
    },
    /**
     * Prepare the component.
     */
    prepareComponent() {
      this.error = false;
      this.loading = true;
      this.summary = [];
      this.balances = [];
      this.billsPaid = [];
      this.billsUnpaid = [];
      this.leftToSpend = [];
      this.netWorth = [];
      let startStr = format(this.start, 'y-MM-dd');
      let endStr = format(this.end, 'y-MM-dd');
      //let startStr = this.start.toISOString().split('T')[0];
      //let endStr = this.end.toISOString().split('T')[0];
      //console.log(startStr);
      //console.log(endStr);
      axios.get('./api/v1/summary/basic?start=' + startStr + '&end=' + endStr)
          .then(response => {
            this.summary = response.data;
            this.buildComponent();
            this.loading = false
          }).catch(error => {
        this.error = true
      });
    },
    buildComponent() {
      this.getBalanceEntries();
      this.getBillsEntries();
      this.getLeftToSpend();
      this.getNetWorth();
    },

    hasCurrency: function (array) {
      for (const key in array) {
        if (array.hasOwnProperty(key)) {
          if (array[key].currency_id === this.currencyId) {
            return true;
          }
        }
      }
      return false;
    },

    getBalanceEntries() {
      this.balances = this.getKeyedEntries('balance-in-');
    },
    getNetWorth() {
      this.netWorth = this.getKeyedEntries('net-worth-in-');
    },
    getLeftToSpend() {
      this.leftToSpend = this.getKeyedEntries('left-to-spend-in-');
    },
    getBillsEntries() {
      this.billsPaid = this.getKeyedEntries('bills-paid-in-');
      this.billsUnpaid = this.getKeyedEntries('bills-unpaid-in-');
    },
    getKeyedEntries(expected) {
      let result = [];
      for (const key in this.summary) {
        if (this.summary.hasOwnProperty(key)) {
          if (expected === key.substr(0, expected.length)) {
            result.push(this.summary[key]);
          }
        }
      }
      return result;
    }
  }
}
</script>
