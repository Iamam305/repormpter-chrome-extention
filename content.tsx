import cssText from "data-text:~style.css"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoGetOverlayAnchor
} from "plasmo"
import React, { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ["https://chatgpt.com/*"],
  all_frames: true
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = () =>
  document.querySelector(`#prompt-textarea`).parentElement.parentElement

// Use this to optimize unmount lookups
export const getShadowHostId = () =>
  "generate-prompt-5fe60ece6f84c441583e1421092993db"
const GeneratePrompt = () => {
  const [loading, setLoading] = useState(false)
  const get_prompt = async () => {
    setLoading(true)
    const textareaElement = document.getElementById(
      "prompt-textarea"
    ) as HTMLTextAreaElement
    const value = textareaElement.value
    console.log(value, value.length)

    if (value.length > 25) {
      const resp = await sendToBackground({
        name: "generate-prompt",
        body: {
          input: value
        }
      })
      textareaElement.value = resp.data[0]
      textareaElement.style.height = `${textareaElement.scrollHeight + 20}px`
      textareaElement.focus()
      setLoading(false)
    }

    setLoading(false)
  }

  return (
    <button
      disabled={loading}
      className="bg-black disabled:bg-gray-900 py-2 px-4 text-xs text-white disabled:text-gray-600 rounded-lg relative  top-0 left-[-70px]"
      onClick={get_prompt}>
      Refine
    </button>
  )
}

export default GeneratePrompt
