import { ref } from "vue"
import { map } from "@servicestack/client"

export default {
    template:`<div class="lang position-relative ps-2 py-2 sm:rounded d-flex" style="background-color:rgb(55 65 81); color:rgb(209 213 219);">
    <div class="d-flex ms-2 justify-content-between" style="width:100%;cursor:pointer;" @click="copy">
      <div>
          <span>$ </span>
          <label class="cursor-pointer">
            <slot>{{text}}</slot>
          </label>
      </div>
      <small class="text-xs px-3 -mt-1" style="color: rgb(156 163 175);">sh</small>
    </div>

    <div v-if="successText" class="position-absolute end-0 rounded p-2" style="background-color:rgb(240 253 244);margin-right:-6rem;margin-top:-0.5rem">
        <div class="d-flex">
            <div class="flex-shrink-0">
                <svg style="width:1.25rem;height:1.25rem;color:rgb(74 222 128);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="ms-1">
                <p class="fs-6 m-0" style="color:rgb(22 101 52);">
                    {{ successText }}
                </p>
            </div>
        </div>
    </div>

  </div>`,
    props:['text'],
    setup(props) {
        let successText = ref('')
        /** @param {MouseEvent} e */
        function copy(e) {
            let $el = document.createElement("input")
            let $lbl = e.target.parentElement.querySelector('label')
            $el.setAttribute("value", $lbl.innerText)
            document.body.appendChild($el)
            $el.select()
            document.execCommand("copy")
            document.body.removeChild($el)
            if (typeof window.getSelection == "function") {
                const range = document.createRange()
                range.selectNodeContents($lbl)
                map(window.getSelection(), sel => {
                    sel.removeAllRanges()
                    sel.addRange(range)
                })
            }
            successText.value = 'copied'
            setTimeout(() => successText.value = '', 3000)
        }
        return { successText, copy }
    }
}
