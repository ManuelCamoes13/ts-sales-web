<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        TS-Sales
        <i class="fa fa-circle text-danger"></i>
      </h5>
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Entre com a sua conta</h3>" customHeader>
        
        <b-alert v-if="error" class="alert-sm text-center mt-2" variant="danger" show>
          Ocorreu algum erro!
          <br/>
          <span class="font-weight-bold">{{error}}</span>
          <br/>
          
        </b-alert>
        <form class="mt" @submit.prevent="login">
          
          <div class="form-group">
            <input class="form-control no-border" v-model="email" required type="email" name="email" placeholder="Email" />
          </div>
          <div class="form-group">
            <input class="form-control no-border" v-model="password" required type="password" name="password" placeholder="Password" />
          </div>
          <b-button type="submit" size="sm" class="auth-btn mb-3" variant="info" @click="login">Entrar</b-button>
         
        </form>
     
        <router-link class="d-block text-center" to="register">Esqueceu a senha?</router-link>
      </Widget>
    </b-container>
    <footer class="auth-footer">
      2024 &copy; TS-Sales - Made by <a href="https://topsecret.co.mz/">TOP - SECRET</a>
    </footer>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import http from "../../../http-common.js";
export default {
  name: 'LoginPage',
  components: { Widget },
  computed: {
 
  },

  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
 methods: {
    login() {
      const data = {
        email: this.email,
        password: this.password,
      };
      http
        .post("/users/login", data)
        .then((result) => {
          console.log(result.data.token);
          localStorage.setItem("token", JSON.stringify(result.data.token));
          localStorage.setItem("user", JSON.stringify(result.data.user));
          this.$router.push({ name: "Produto-list" });
        })
        .catch((error) => {
          this.error = error.response.data;
        });
    },
  },
};
</script>
