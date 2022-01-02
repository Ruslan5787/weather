import { UI_COMPONENTS } from "./view.js";

UI_COMPONENTS.TABS_BTNS.forEach(btn => {
   btn.addEventListener('click', () => {
      changeBtnClass(btn)
      changeTabClass(btn)
   })
});

function changeBtnClass(elem) {
   for (const btn of UI_COMPONENTS.TABS_BTNS) {
      btn.classList.remove('btn-active')
   }
   elem.classList.add('btn-active')
}
function changeTabClass(elem) {
   const idBtn = elem.id
   const activeTab = document.getElementById(`${idBtn}`)
   for (const tab of UI_COMPONENTS.TABS) {
      tab.classList.remove('tab-active')
   }
   activeTab.classList.add('tab-active')
}
