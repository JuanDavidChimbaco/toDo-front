<template>
    <div class="pb-8 ml-5">
        <v-btn color="primary" class="mx-1 mb-2">
            <v-icon>mdi-note-plus</v-icon>
            Add Task

            <v-dialog v-model="dialogAdd" activator="parent" width="500">
                <v-card title="New Task">
                    <v-card-text>
                        <v-text-field label="title" required v-model="newTitle"></v-text-field>
                        <v-textarea label="description" v-model="newDescription"></v-textarea>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text="Close" @click="dialogAdd = false"></v-btn>
                        <v-btn text="save" @click="addTask"></v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-btn>
    </div>

    <div class="ml-4 mr-4">
        <v-expansion-panels class="mb-6">
            <v-expansion-panel v-for=" task in listaTareas" :key="task.id">
                <v-expansion-panel-title expand-icon="mdi-menu-down"
                    v-bind:style="{ backgroundColor: task.completed ? 'green' : 'transparent' }">
                    {{ task.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            Description: {{ task.decription }}
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="12" sm="4" md="3">
                            <span v-if="task.completed === true">
                                <v-icon>
                                    mdi-check-all
                                </v-icon>
                                Completed
                            </span>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            Created: {{ task.at_created }}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn color="primary" @click="viewById(task.id)" class="mx-1 mb-2">
                                <v-icon>mdi-lead-pencil</v-icon>
                                Edit

                                <v-dialog v-model="dialog" activator="parent" width="500">
                                    <v-card>
                                        <v-card title="Edit Task">
                                            <v-card-text>
                                                <v-text-field label="title" required v-model="editTitle"></v-text-field>
                                                <v-textarea label="description" v-model="editDescription"></v-textarea>
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>

                                                <v-btn text="Close" @click="dialog = false"></v-btn>
                                                <v-btn text="save" @click="editTask"></v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-card>
                                </v-dialog>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn @click="deleteTask(task.id)" color="error" text="Delete" prepend-icon="mdi-delete"
                                class="mx-1 mb-2"></v-btn>
                        </v-col>
                        <v-col>
                            <v-btn v-if="task.completed === false" color="success" @click="completed(task.id)"
                                class="mx-1 mb-2">
                                <v-icon>mdi-check</v-icon>
                                Complete
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    data: () => ({
        listaTareas: [],
        token: localStorage.tokenAccess,
        newTitle: "",
        newDescription: "",
        id: localStorage.user_id,
        editDescription: "",
        editTitle: "",
        dialog: false,
        dialogAdd: false,
        model: "No",
        color: "",
    }),
    methods: {
        viewById(id) {
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            axios.get('http://127.0.0.1:8000/api/Tareas/' + id, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                }
            })
                .then((response) => {
                    console.log(response.data)
                    this.editDescription = response.data.decription
                    this.editTitle = response.data.title
                    localStorage.idTaskview = response.data.id
                })
                .catch(error => {
                    console.log(error)
                })
        },
        editTask() {
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            let idTask = parseInt(localStorage.idTaskview)
            let idUser = parseInt(this.id)
            if (this.editTitle === "" || this.editDescription === "") {
                this.dialog = false
                Swal.fire({
                    icon: 'error',
                    title: 'No puede dejar campos vacios',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#3085d6',
                })
            } else {
                let data2 = {
                    id: idTask,
                    title: this.editTitle,
                    decription: this.editDescription,
                    completed: false,
                    usuario: idUser,
                }
                console.log(data2)
                axios.put(`http://127.0.0.1:8000/api/Tareas/${idTask}/`, data2, {
                    headers: {
                        Authorization: 'Bearer ' + this.token,
                    }
                })
                    .then((response) => {
                        console.log(response.data)
                        this.listaTareas = this.listaTareas.filter((task) => task.id != idTask)
                        this.listaTareas.push(response.data)
                        this.lipiarCampos()
                        this.dialog = false
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }

        },
        addTask() {
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            let data = {
                title: this.newTitle,
                decription: this.newDescription,
                usuario: this.id,
                completed: false,
            }
            if (this.newTitle === "" || this.newDescription === "") {
                this.dialog = false
                Swal.fire({
                    icon: 'error',
                    title: 'No puede dejar campos vacios',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#3085d6',
                })
            } else {
                axios.post('http://127.0.0.1:8000/api/Tareas/', data, {
                    headers: {
                        Authorization: 'Bearer ' + this.token,
                    }
                })
                    .then((response) => {
                        console.log(response.data)
                        this.listaTareas.push(response.data)
                        this.lipiarCampos()
                        this.dialogAdd = false
                        Swal.fire({
                            icon: 'success',
                            title: 'Task created successfully',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#3085d6',
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },
        deleteTask(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteTask2(id)
                    Swal.fire(
                        {
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'Your file has been deleted.',
                            confirmButtonText: 'Ok',
                            confirmButtonColor: '#3085d6',
                       }
                    )
                }
            })
        },
        deleteTask2(id) {
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            console.log(id)
            axios.delete('http://127.0.0.1:8000/api/Tareas/' + id, {
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
        completed(id) {
            axios.defaults.xsrfCookieName = 'csrftoken';
            axios.defaults.xsrfHeaderName = 'X-CSRFToken';
            console.log(id)
            axios.post('http://127.0.0.1:8000/completed/', { "id": id }, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                }
            })
                .then((response) => {
                    console.log(response)
                    location.reload()
                })
                .catch(error => {
                    console.log(error)
                })
        }
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
                response.data.forEach(element => {
                    console.log(element.completed)
                    if (element.completed === true) {
                        this.color = "blue"
                        this.completado = "Completed"
                    } else {
                        this.color = ""
                        this.completado = "No Completed"
                    }
                });

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