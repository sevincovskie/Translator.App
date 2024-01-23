const sourceLanguageDropdown = document.querySelector('#sourceLanguageDropdown');
const targetLanguageDropdown = document.querySelector('#targetLanguageDropdown');
const sourceTextArea = document.querySelector('#sourceTextArea');
const targetTextArea = document.querySelector('#targetTextArea');
const translateBtn = document.querySelector('#translateBtn');

let languages = []
let sourceSelect = 'en'
let targetSelect = 'az'

sourceLanguageDropdown.addEventListener('change', (e) => {
   sourceSelect=e.target.value
   console.log(sourceSelect);
})
targetLanguageDropdown.addEventListener('change', (e) => {
  targetSelect= e.target.value
  console.log(targetSelect);
})  

// GET request 

// async function getDataTranslator() {
//   const url = "https://text-translator2.p.rapidapi.com/translate";
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "84ecaa6701mshf2901a18afe0bdep168de6jsn854cb4cfe763",
//       "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
//     },

//   };
//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     console.log(result);
//     return result.data.languages;
    
//   } catch (error) {
//     console.error(error);
//   }
// }

// POST request

// async function translator() {
//   const options = {
//     method: "POST",
//     headers: {
//       "content-type": "application/x-www-form-urlencoded",
//       "X-RapidAPI-Key": "9d9588302emsh58804fa5a30d4d9p1b947ajsn659ea6ae2269",
//       "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
//     },
//     body: new URLSearchParams({
//       sourceLang: sourceLang,
//       targetLang: targetLang,
//       text: textToTranslate,
//     }),
//   };

//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
//     return result.data

//   } catch (error) {
//     console.error(error);

//   }
// }

// // Event listener
// translateBtn.addEventListener("click", function () {
//   translateText();
// });

// async function translateText() {
//   const sourceLang = sourceLang.value;
//   const targetLang = targetLang.value;
//   const text = textToTranslate.value;

//   if (!textToTranslate) {
//     alert("Enter text to translate.");
//     return;
//   }

//   const translation = await translator(sourceLang, targetLang, textToTranslate);

//   // Display 
//   targetTextArea.value = translation;
// }



async function getLanguages (){
  const url = 'https://text-translator2.p.rapidapi.com/getLanguages';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4cd5e3c8edmsh3e4621d279cc864p1cd288jsnfb64962a13d2',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result.data.languages);
  return result.data.languages
} catch (error) {
	console.error(error);
}
}
// getLanguages();


// select languages

async function showLanguages(){
  let data = await getLanguages();
   data = data.filter((e)=> e.code != 'hy')
   sourceLanguageDropdown.innerHTML+=data.map((e) => {
      return `<option value="${e.code}">${e.name}</option>`
   });
   targetLanguageDropdown.innerHTML+=data.map((e) => {
    return `<option value="${e.code}">${e.name}</option>`
 });

}
showLanguages();

// api post request

async function translate(sourceLang,targetLang,sourceTextArea) {
  const url = 'https://text-translator2.p.rapidapi.com/translate';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': '4cd5e3c8edmsh3e4621d279cc864p1cd288jsnfb64962a13d2',
		'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
	},
	body: new URLSearchParams({
		source_language:sourceLang,
		target_language: targetLang,
		text: sourceTextArea.value
	})
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result.data.translatedText);
  return result.data.translatedText;
} catch (error) {
	console.error(error);
}

}
// translate();


   // translate button click

 translateBtn.addEventListener('click',async() =>{
  targetTextArea.value = await translate(sourceSelect,targetSelect,sourceTextArea);
 

 });
 