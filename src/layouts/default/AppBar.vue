<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-view-list" />

      Tasks App
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <a @click="logout">
      <v-btn icon>
          <v-icon>mdi-export</v-icon>
        </v-btn>
    </a>
  </v-app-bar>
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = () => {
    let token = localStorage.tokenAccess
    axios.post('http://localhost:8000/logout/', {'logout': "logout"},{
        headers: {
            Authorization: 'Bearer ' + token,
        }
    })
        .then(() => {
            localStorage.removeItem('tokenAccess')
            localStorage.removeItem('tokenRefresh')
            router.push('/')
        })
        .catch(error => {
            console.log(error)
        })
}
</script>
