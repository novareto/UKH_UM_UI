<template>
  <div class="panel-body">
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    <b-button variant="primary" @click="submit()">Create</b-button>
  </div>
</template>

<script>
import axios from 'axios'
import { API_URL } from '../config'


export default {

    mounted: function() {
	var self = this;
	axios.get(
	      API_URL + '/users/schema'
	  ).then(
	      response => { self.schema = response.data }
	  )
    },

    data: () => ({
	schema: null,
	model: {},
	formOptions: {
	    validateAfterLoad: true,	
	    validateAfterChanged: true
	}
    }),

    methods: {
	submit (e) {
	    axios.post( 
		API_URL + '/users/create', this.model, {
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
