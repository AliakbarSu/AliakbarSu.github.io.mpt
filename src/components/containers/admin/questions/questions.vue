<template>
    <div>
      <h1 class="title">Questions Admin Dashboard</h1>
      <div class="question__update">
            <div class="update">
                <ckeditor :editor="editor" v-model="question.question" :config="editorConfig"></ckeditor>
                <ckeditor v-for="choice in question.choices" v-model="choice.text" :key="choice.id" :editor="editor" :config="editorConfig"></ckeditor>
                <div class="update__actions" v-if="question.key">
                    <button class="actions__action" @click="editQuestion(question.key)">Edit</button>
                    <button class="actions__action actions--yellow" @click="suspend(question.key)">{{question.active ? 'Suspend' : 'Unsuspend'}}</button>
                    <button class="actions__action actions--red" @click="deleteQuestion(question.key)">Delete</button>
                    <button class="actions__action actions--orange" @click="returnBack()">Return</button>
                </div>
            </div>
        <!-- <UpdateQuestion
            @returnBack="returnBack" 
            @triggerChange="toggleEditing" 
            @edit="editQuestion" 
            @suspend="suspend" 
            @deleteQuestion="deleteQuestion"/> -->
      </div>
      <div class="questions" v-if="questions">
            <div v-for="question in questions" :key="question.id" class="question" :class="{'question--active': isActive(question.key)}">
                <span class="question__id">{{question.id}}</span>
                <p class="question__question" v-html="question.question"></p>
                <div class="question__actions">
                    <button class="actions__action" @click="edit(question.key)">Edit</button>
                    <button class="actions__action actions--yellow" @click="suspend(question.key)">{{question.active ? 'Suspend' : 'Unsuspend'}}</button>
                    <button class="actions__action actions--red" @click="deleteQuestion(question.key)">Delete</button>
                </div>
                <div class="status">
                    <p>Grammer: {{question.grammerModified ? "Yes" : "No"}}</p>
                    <p>Context: {{question.contextModified ? "Yes" : "No"}}</p>
                    <p>Choices: {{question.choicesModified ? "Yes" : "No"}}</p>
                </div>
            </div>
      </div>
    </div>
</template>

<script>
// import UpdateQuestion from './components/updateQuestion/updateQuestion'
import firestore from '../../../../../firebase'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
    data() {
        return {
            editor: ClassicEditor,
            editorConfig: {},
            questionsArray: [],
            question: {},
            currentLocation: 0
        }
    },
    async created() {
        const questionsDoc = await firestore.db.collection("modifiedQuestions").get()
        const questionsArray = []
        questionsDoc.forEach(snapshot => {
            questionsArray.push({...snapshot.data(), key: snapshot.id})
        })
        this.$store.commit("setQuestions", questionsArray.slice(0, 10))

        this.questionsArray = questionsArray
        return Promise.resolve()
    },
    components: {
        // UpdateQuestion
    },
    methods: {
        edit(key) {
            if(this.isEditing) {
                this.$swal({
                    title: 'Are you sure?',
                    text: 'Your changes will be discarted',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, discart',
                    cancelButtonText: 'No, keep changes'
                }).then(({value}) => {
                    if(value) {
                        this.proceedWithEdit(key)
                    }
                })    
            }else {
                this.proceedWithEdit(key)
            }
        },
        suspend(key) {
            this.$store.dispatch("suspend", key)
        },
        async deleteQuestion(key) {
            firestore.db.collection("modifiedQuestions").doc(key).delete()
            .then(() => {
                if(this.question.key == key) {
                    this.question = {}
                }
                this.questionsArray = this.questions.filter(q => q.key !== key)
                this.returnBack()
            }).catch(console.log)
        },
        async editQuestion(payload) {
            const question = this.questions.find(q => q.key == payload.key)
            firestore.db.collection("modifiedQuestions").doc(payload.key).update({
                question: payload.question,
                choices: payload.choices,
                choicesModified: payload.choices.map(ch => ch.text).join("") !== question.choices.map(ch => ch.text).join("")
            })
            .then(() => {
                const questionIndex = this.questions.findIndex(q => q.key == payload.key)
                this.questions[questionIndex].question = payload.question
                this.questions[questionIndex].choices = payload.choices
                this.questions[questionIndex].choicesModified = payload.choices.map(ch => ch.text).join("") !== question.choices.map(ch => ch.text).join("")
            })
            .catch(err => console.log(err))

        },
        toggleEditing() {
            this.isEditing = true
        },
        proceedWithEdit(key) {
            this.question = this.questions.find(q => q.key == key)
            this.currentLocation = window.scrollY + 550
            this.scrollToTop()
        },
        scrollToTop() {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        },
        returnBack() {
            window.scroll({
                top: this.currentLocation,
                left: 0,
                behavior: 'smooth'
            })
        },
        isActive(key) {
            return key == this.question.key
        }
    },
    computed: {
        questions() {
            // return this.$store.getters.getQuestions
            return this.questionsArray
        }
    }
}
</script>

<style scoped lang="scss">


.title {
    width: 100%;
    padding: 12px;
    text-align: center;
}

.questions {
    padding: 12px;
    font-family: sans-serif;
}

.question {
    padding: 20px;
    width: 80%;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.question--active {
    background: #eab75a;
}


.actions__action {
  position: relative;
  overflow: hidden;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
  background: #70bf70;
  border: 1px solid #70bf70;
  color: white;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  outline: none;
  &:hover {
    cursor: pointer;
    transition: 0.3s;
    background: white;
    color: #70bf70;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
  &:active {
    outline: none;
  }
}


.actions__action:after {
  content: "";
  background: #f1f1f1;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s
}

.actions__action:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}


.actions--red {
  background: #f36c6c;
  border: 1px solid #f36c6c;
  &:hover {
    color: #f36c6c;
  }
}


.actions--yellow {
  background: #c5c56d;
  border: 1px solid #c5c56d;
  &:hover {
    color: #c5c56d;
  }
}

.update {
    font-family: sans-serif;
    padding: 12px;
    width: 95%;
    border-radius: 5px;
    margin: auto;
    margin-bottom: 7%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.update__actions {
    padding: 12px;
}


.actions__action {
  position: relative;
  overflow: hidden;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
  background: #70bf70;
  border: 1px solid #70bf70;
  color: white;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  outline: none;
  &:hover {
    cursor: pointer;
    transition: 0.3s;
    background: white;
    color: #70bf70;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
  &:active {
    outline: none;
  }
}


.actions__action:after {
  content: "";
  background: #f1f1f1;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s
}

.actions__action:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}


.actions--red {
  background: #f36c6c;
  border: 1px solid #f36c6c;
  &:hover {
    color: #f36c6c;
  }
}


.actions--yellow {
  background: #c5c56d;
  border: 1px solid #c5c56d;
  &:hover {
    color: #c5c56d;
  }
}

.actions--orange {
    background: #eab516;
    border: 1px solid #eab516;
    &:hover {
        color: #eab516;
    }
}
</style>