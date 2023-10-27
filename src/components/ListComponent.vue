<template>
    <div class="pb-8">
        <v-dialog width="500">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" text="Add Task" prepend-icon="mdi-note-plus"> </v-btn>
            </template>

            <template v-slot:default="{isActive}" >
                <v-card title="New Task">
                    <v-card-text>
                        <v-text-field label="title" required v-model="newTitle"></v-text-field>
                        <v-textarea label="description" v-model="newDescription"></v-textarea>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text="Close" @click="isActive.value = false"></v-btn>
                        <v-btn text="save" @click="addTask"></v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>

    <div>
        <v-expansion-panels class="mb-6">
            <v-expansion-panel v-for=" task in listaTareas" :key="task.id">
                <v-expansion-panel-title expand-icon="mdi-menu-down">
                    {{ task.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            {{ task.decription }}
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="12" sm="6" md="4">
                            {{ task.at_created }}
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="12" sm="6" md="4">
                            <v-btn color="primary" text>Editar</v-btn>
                            <v-btn @click="deleteTask(task.id)" color="error" text="Eliminar"></v-btn>
                        </v-col>
                    </v-row>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data: () => ({
        listaTareas: [],
        token: localStorage.tokenAccess,
        newTitle: "",
        newDescription: "",
        id: localStorage.user_id,
    }),
    methods: {
        addTask() {
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            let data = {
                title: this.newTitle,
                decription: this.newDescription,
                usuario: this.id,
                completed: false,
            }
            axios.post('http://127.0.0.1:8000/api/Tareas/', data,{
                headers: {
                    Authorization: 'Bearer ' + this.token,
                }
            })
                .then((response) => {
                    console.log(response.data)
                    this.listaTareas.push(response.data)
                    this.lipiarCampos()
                    this.closeDialog()
                })
                .catch(error => {
                    console.log(error)
                })
        },
        deleteTask(id) {
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            console.log(id)
            axios.delete('http://127.0.0.1:8000/api/Tareas/'+id,{
                headers: {
                    Authorization: 'Bearer ' + this.token,
                }
            })
                .then((response) => {
                    console.log(response.data)
                    this.listaTareas = this.listaTareas.filter((task) => task.id != id)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        lipiarCampos() {
            this.newTitle = ""
            this.newDescription = ""
        },
    },
    mounted() {
        let token = localStorage.tokenAccess
        axios.get('http://127.0.0.1:8000/api/Tareas/', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
            .then((response) => {
                this.listaTareas = response.data
                console.log(response.data)
                localStorage.tareas = JSON.stringify(response.data)
            })
            .catch(error => {
                console.log(error)
                if (error.response.data.code === "token_not_valid" || error.response.status === 401) {
                    this.$router.push('/')
                }
            })

    }
}
</script>
<style scoped></style>