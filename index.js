(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const l="46058905-76d6ace161caaf887286baf22",d=document.getElementById("search-form"),u=document.getElementById("search-input"),i=document.getElementById("gallery"),n=document.getElementById("loader");let p=new SimpleLightbox(".gallery a");const f=async o=>{const t=`https://pixabay.com/api/?key=${l}&q=${encodeURIComponent(o)}&image_type=photo&orientation=horizontal&safesearch=true`;function r(){n.style.display="block"}function a(){n.style.display="none"}n.hidden=!0;try{r();const s=await(await fetch(t)).json();a(),h(),n.hidden=!1,s.hits.length===0?iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}):(m(s.hits),p.refresh())}catch(e){n.hidden=!0,console.error("Error fetching images from Pixabay:",e)}},m=o=>{o.forEach(t=>{const r=document.createElement("div");r.classList.add("card"),r.innerHTML=`
            <a href="${t.largeImageURL}">
                <img src="${t.webformatURL}" alt="${t.tags}">
            </a>
            <div class="stats">
                <span class="span">Likes
                ${t.likes}</span>
                <span class="span">Views 
                ${t.views}</span>
                <span class="span">Comments 
                ${t.comments}</span>
                <span class="span">Downloads 
                ${t.downloads}</span>
            </div>
        `,i.appendChild(r)})},h=()=>{i.innerHTML=""};d.addEventListener("submit",o=>{o.preventDefault();const t=u.value.trim();t!==""&&f(t)});
//# sourceMappingURL=index.js.map
