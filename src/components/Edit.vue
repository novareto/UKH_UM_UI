<template>
  <div class="panel-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    <b-button variant="primary" @click="submit()">Update</b-button>
  </div>
</template>

<script>
import axios from 'axios'
import { API_URL } from '../config'


export default {

    mounted: function() {
	var self = this;
	self.oid = self.$route.params.id;
	axios.get(
	      API_URL + '/users/schema'
	  ).then(
	      response => { self.schema = response.data }
	  );
	axios.get(
	      API_URL + '/users/get/' + self.oid
	  ).then(
	      response => { self.model = response.data.model }
	  );
    },

    data: () => ({
	schema: null,
	oid: null,
	model: {},
	model: {},
	formOptions: {
	    validateAfterLoad: true,	
	    validateAfterChanged: true
	}
    }),

    methods: {
	submit (e) {
	    axios.put( 
		API_URL + '/users/update/' + this.oid, this.model, {
		    headers: {
			'Content-Type': 'application/json'
		    }
		}).then(
		    response => {
			console.log(response.data);
		    }
		)
	}
    }
}
</script>

<style>
  .form {
    text-align: left;
    width: 600px;
    margin: auto;
  }
  h2 {
    font-size: 1.7em;
    text-align: center;
    margin-top: 0;
    margin-bottom: .2em
  }
  h2 + small {
    display: block;
    text-align: center;
    margin-bottom: 1.2em
  }
  small {
    line-height: 20px;
    display: block;
  }
  .el-alert {
    margin-bottom: 15px
  }
</style>
