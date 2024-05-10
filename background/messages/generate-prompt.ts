import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const apiUrl = "https://repormpter-api.onrender.com/generate-prompt"
  const requestBody = { input: req.body.input }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })

    if (response.ok) {
      const data = await response.json()
      console.log(data.data)

      res.send({
        data
      })
    } else {
      throw new Error(`Error: ${response.status} - ${response.statusText}`)
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`)
  }
}

export default handler
