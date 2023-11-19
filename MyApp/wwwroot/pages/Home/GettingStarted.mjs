import { ref, computed } from "vue"
import ShellCommand from "../components/ShellCommand.mjs"

export default {
    components: {
        ShellCommand,
    },
    template:/*html*/`
    <div class="d-flex flex-column" style="width:24rem;">
        <h4 class="py-2 text-center text-xl">Create New Project</h4>

        <input type="text" v-model="project" autocomplete="off" spellcheck="false" @keydown="validateSafeName"
             class="form-control" />

        <section class="mt-4 d-flex justify-content-center text-center">
           <div class="mb-3">
              <div class="d-flex justify-content-center text-center">
                 <a class="archive-url" :href="zipUrl('NetCoreTemplates/' + template)" style="text-decoration:none">
                    <div class="px-2 py-4 me-2 mb-4 rounded shadow-lg text-center items-center justify-content-center hover:shadow-2xl" style="min-width:150px">
                       <div class="text-center font-extrabold d-flex items-center justify-content-center mb-2">
                          <div class="fs-4 text-blue-400 my-2">
                            <svg class="text-indigo-600" style="width:3.5rem;height:3.5rem;" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M10 6c1.544 1.76 2.276 4.15 2.217 6.61c3.968 1.67 9.924 6.12 11.181 12.39H28C26.051 14.31 14.918 6.77 10 6zm-2 7c4.67 4.913.81 11.582-4 12h18.97C21.5 18.289 11.95 13.533 8 13z"></path></svg>
                        </div>
                       </div>
                       <div class="fs-4 text-dark"><b>{{template}}</b></div>
                       <span class="archive-name px-4 pb-2 text-blue-600">{{ projectZip }}</span>
                    </div>
                 </a>
              </div>
           </div>
        </section>

      <ShellCommand class="mb-3">dotnet tool install -g x</ShellCommand>
      <ShellCommand class="mb-3">x new {{template}} {{project}}</ShellCommand>

      <h4 class="py-3 text-center fs-4">Run .NET Project (New Terminal)</h4>
      <ShellCommand class="mb-3">dotnet watch</ShellCommand>

    </div>`,
    props: { template:String },
    setup(props) {
        const project = ref('ProjectName')

        const projectZip = computed(() => (project.value || 'MyApp') + '.zip')

        /** @param {string} template */
        const zipUrl = (template) =>
            `https://account.servicestack.net/archive/${template}?Name=${project.value || 'MyApp'}`

        /** @param {KeyboardEvent} e */
        const isAlphaNumeric = (e) => {
            const c = e.charCode;
            if (c >= 65 && c <= 90 || c >= 97 && c <= 122 || c >= 48 && c <= 57 || c === 95) //A-Za-z0-9_
                return;
            e.preventDefault()
        }

        /** @param path {string}
         * @returns {string} */
        const resolvePath = (path) => navigator.userAgent.indexOf("Win") >= 0 ? path.replace(/\//g,'\\') : path
        const uiPath = () => resolvePath(`ui`)
        const apiPath = () => resolvePath(`api/${project.value}`)

        /** @param e {KeyboardEvent} */
        function validateSafeName(e) {
            if (e.key.match(/[\W]+/g)) {
                e.preventDefault()
                return false
            }
        }
        return { project, projectZip, zipUrl, isAlphaNumeric, uiPath, apiPath, validateSafeName }
    }
}