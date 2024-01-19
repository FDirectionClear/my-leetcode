let no = 1

function mockPost(url) {
  let noi = no
  console.log(`${no++}. 请求发送 ${url}`)
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${noi} back`)
      resolve()
    }, Math.random() * 2000)
  })
}

function multiRequest(urls = [], maxNum) {
  let doingCount = 0

  function requestSimple() {
    if (!urls.length) return

    let curr = urls.splice(0, 1)

    doingCount ++

    mockPost(curr).then(() => {
      doingCount --
      requestSimple()
    })

    if (doingCount < maxNum) {
      requestSimple()
    } 
  }

  requestSimple()
}

const list = new Array(14).fill('http').map((item, index) => item + (index + 1))

multiRequest(list, 6)
