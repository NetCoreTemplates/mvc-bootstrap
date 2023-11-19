import { ref, inject } from "vue"
import { Hello } from "dtos.mjs"

export default {
    template:/*html*/`<div class="d-flex flex-column justify-content-center">
        <div class="mx-auto" style="width:14rem">
            <input class="form-control" v-model="name" @keyup="update" spellcheck="false" />
        </div>
        <div class="mt-2 fs-4"><b>{{ result }}</b></div>
    </div>`,
    props:['value'],
    setup(props) {
        let name = ref(props.value)
        let result = ref('')
        let client = inject('client')
        
        async function update() {
            let api = await client.api(new Hello({ name:name.value }))
            if (api.succeeded) {
                result.value = api.response.result
            }
        }
        update()
        
        return { name, update, result }
    }
}
