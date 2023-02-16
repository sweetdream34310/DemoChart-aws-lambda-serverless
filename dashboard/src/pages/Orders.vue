<template>
  <div>
    <div class="container" style="margin-bottom: 36px">
        <h2> {{countedOrders}}  Orders</h2>
    </div>
      
    <div class="table-container">
		<table class="table">
			<thead>
			<tr>
				<th>UID</th>
				<th>userUid</th>
				<th>email</th>
				<th>orderDate</th>
				<th>invoiceAmount</th>
				<th>currency</th>
				<th>paypalOrderId</th>
        <th>products</th>
				<th>state</th>
				<th>createdAt</th>
				<th>updatedAt</th>
				<th>deletedAt</th>
			</tr>
			</thead>

			<tbody>
			<tr v-for="order in orders" :key="order.uid" style="font-size: 12px">
				<td>{{order.uid}} </td>
                <td><div class="orderfield">{{order.userUid}}</div></td>
                <td><div class="orderfield">{{order.email}}</div></td>
                <td><div class="orderfield">{{order.orderDate}}</div></td>
                <td><div class="orderfield">{{order.invoiceAmount}}</div></td>
                <td><div class="orderfield">{{order.currency}}</div></td>
                <td><div class="orderfield">{{order.paypalOrderId}}</div></td>
                <td><div class="orderfield">{{order.productOrder && order.productOrder.map(el => el.product.name)}}</div></td>
                <td><div class="orderfield">{{order.state}}</div></td>
                <td><div class="orderfield">{{order.createdAt}}</div></td>
                <td><div class="orderfield">{{order.updatedAt}}</div></td>
                <td><div class="orderfield">{{order.deletedAt}}</div></td>		
			</tr>
			</tbody>
		</table>
    </div>

  </div>
</template>

<script>
import useAuth from "../use/Auth";

const auth = useAuth();

const basePath = import.meta.env.VITE_API_BASE_PATH;

export default {
    name: 'orders',
    components: {},
    data() {
        return {
            orders: []
        }
    },
    mounted: function () {
        this.getOrders().then(res => {
            this.orders = res
        })
    },
    computed: {
        countedOrders() {
            return this.orders.length;
        },
    },
    methods: {
        async getOrders() {
            console.log(basePath + 'shop/getOrders')
            const res = await fetch(basePath + 'shop/getOrders', {
                method: "GET",
                mode: "cors",
                headers: auth.getAuthHeader(),
            });
            const resJson = await res.json();
            console.log("Received Orders");
            console.log(resJson);
            resJson.push({});
            return resJson;
        }
    },


}
</script>

<style lang="scss" scoped>
    table {
		width: 100vw;
    overflow-x: auto;
	}

  tr > td {
    border: solid 0.4px rgb(60,60,60);
    border-radius: 3px;
  }

  .table-container {
    width: 100vw;
    overflow-x: auto;
  }

</style>