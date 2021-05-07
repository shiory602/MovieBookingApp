
# Problem

## fetchしたデータのタイトル下にカテゴリー名を表示したいがデータの中にカテゴリーidしかない

> `Promise.all([])`を使って複数のデータを同時に読み込む
```javascript
Promise.all([fetchデータ名1, fetchデータ名2, ...])
```
さらに、`findGenreName()`を作って`data1`（fetchしたデータ）のジャンルidが`data2`（カテゴリーデータ）のジャンルidと同じだった時に`data.genres[index].name`を返すようにする。
```javascript
Promise.all([
    getUpcomingMovieData(),
    getMovieCategories(),
])
.then(([data1, data2]) => {
    data1.results.forEach(el => {
        upcoming.innerHTML += `
            <div class="film-item">
                <a href="./movieDetail.html" target="_blank" rel="noopener noreferrer">
                    <img src="https://image.tmdb.org/t/p/w500${el.poster_path}" alt="${el.title}">
                    <h4>${el.title}</h4>
                    <p>${el.genre_ids.map(id => findGenreName(data2, id)).join(', ')}</p>
                </a>
            </div>
        `;
    })
})
.catch(error => console.error(error));

function findGenreName(data, id) {
    return data.genres.find(el => el.id === id).name;
}
```


## ジャンルごとに表示させる時にタグの位置も指定
この並びにしたい
```html
<div class="section-titles">
  <h2 id="Action">Action</div>
  <div class="films">
    <div class="film-item">
      <a href="./movieDetail.html" target="_blank" rel="noopener noreferrer">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h4>${movie.title}</h4>
        <p>${movie.genre_ids.map(id => findGenreName(data2, id)).join(', ')}</p>
      </a>
    </div>
  </div>
</div>
```

```js
data2.genres.forEach(data => {
    // 見出し（とりあえず innerHTML のまま）
    genre.innerHTML += `<h2 id="${data.name}">${data.name}</h2>`;

    // 一覧
    const genreMovies = data1.results.filter(
        (v) => v.genre_ids.includes(data.id)
    );
    const elFilmList = createFilmList(genreMovies);
    genre.append(elFilmList);

    // 一覧要素を生成して返す
    function createFilmList(genreMovies) {
    const el = document.createElement("div");
    el.classList.add("films");
    genreMovies.forEach((movie) => {
        el.innerHTML = ``;
    });
    return el;
    }
})
```