(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const l="46058905-76d6ace161caaf887286baf22",d=document.getElementById("search-form"),u=document.getElementById("search-input"),i=document.getElementById("gallery"),c=document.getElementById("loader");let p=new SimpleLightbox(".gallery a");const f=async n=>{const e=`https://pixabay.com/api/?key=${l}&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true`;c.hidden=!0;try{const o=await(await fetch(e)).json();h(),c.hidden=!0,o.hits.length===0?iziToast.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}):(m(o.hits),p.refresh())}catch(s){c.hidden=!0,console.error("Error fetching images from Pixabay:",s)}},m=n=>{n.forEach(e=>{const s=document.createElement("div");s.classList.add("card"),s.innerHTML=`
            <a href="${e.largeImageURL}">
                <img src="${e.webformatURL}" alt="${e.tags}">
            </a>
            <div class="stats">
                <span class="span">Likes
                ${e.likes}</span>
                <span class="span">Views 
                ${e.views}</span>
                <span class="span">Comments 
                ${e.comments}</span>
                <span class="span">Downloads 
                ${e.downloads}</span>
            </div>
        `,i.appendChild(s)})},h=()=>{i.innerHTML=""};d.addEventListener("submit",n=>{n.preventDefault();const e=u.value.trim();e!==""&&f(e)});
//# sourceMappingURL=index.js.map
