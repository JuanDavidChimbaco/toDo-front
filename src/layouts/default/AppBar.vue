<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-icon icon="mdi-view-list" />

      Tasks App
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <a @click="logout" v-show="visible">
      <v-tooltip activator="parent" location="start">Logout</v-tooltip>
      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </a>
  </v-app-bar>
</template>

<script setup>
import axios from 'axios'
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = () => {
  let token = localStorage.tokenAccess
  Swal.fire({
    icon: 'question',
    title: 'Are you sure ?',
    showCancelButton: true,
    showConfirmButton: true,
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Logout',
    confirmButtonColor: '#3085d6'
  }).then((result) => {
    if (result.isConfirmed) {
      axios.post('http://localhost:8000/logout/', { 'logout': "logout" }, {
        headers: {
          Authorization: 'Bearer ' + token,
        }
      })
        .then(() => {
          localStorage.removeItem('tokenAccess')
          localStorage.removeItem('tokenRefresh')

          localStorage.removeItem('user_id')
          localStorage.removeItem('completedView')
          localStorage.removeItem('tareas')
          localStorage.removeItem('idTaskview')

          router.push('/')
          window.location.reload()
        })
        .catch(error => {
          console.log(error)
        })
      }
  });
}

let visible = false

const userAuth = () => {
  let token = localStorage.tokenAccess
  if (token == undefined) {
    router.push('/')
    visible = false
  } else {
    visible = true
  }
}

window.onload = userAuth()
</script>
