<template>
  <div>
    <v-container class="" fluid>

      <v-btn class="text-center" to="/" >
        <v-icon>mdi-home</v-icon>
        Home
      </v-btn>

      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>

        <v-text-field density="compact" placeholder="Username" prepend-inner-icon="mdi-account-outline" variant="outlined"
          v-model="username"></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password

          <!-- <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
          Forgot login password?</a> -->
        </div>

        <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
          density="compact" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
          @click:append-inner="visible = !visible" v-model="password"></v-text-field>

        <!-- <v-card class="mb-12" color="surface-variant" variant="tonal">
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If
          you must login now, you can also click "Forgot login password?" below to reset the login password.
        </v-card-text>
      </v-card> -->

        <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="login">
          Log In
        </v-btn>

        <v-card-text class="text-center">
          <v-btn class="text-blue text-decoration-none" to="/register" rel="noopener noreferrer">
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </v-btn>
        </v-card-text>
      </v-card>

    </v-container>

  </div>
</template>
<script>
import axios from 'axios'
export default {
  data: () => ({
    visible: false,
    username: "",
    password: "",
  }),
  methods: {
    login() {
      axios.post("http://localhost:8000/login/", {
        username: this.username,
        password: this.password,
      }).then((res) => {
        console.log(res);
        if (res.status == 200) {
          localStorage.tokenAccess = res.data.access
          localStorage.tokenRefresh = res.data.refresh
          localStorage.user_id = res.data.usuario_id
          this.$router.push("/tasks");
        } else {
          alert("Login failed");
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

