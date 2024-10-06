function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    let markdown = document.getElementById("test");
    console.log(markdown.innerHTML);
    markdown.innerHTML = "Rerum nihil error officiis aperiam asperiores animi est suscipit. Aut velit eum     expedita consequatur. At exercitationem illum dolorem ipsa voluptatem cumque    consequuntur. Nesciunt optio inventore aut voluptas.Dolores error beatae totam facere minus dolores. Quae ullam nihil hic id porro  voluptas fuga. Possimus ullam rerum assumenda recusandae. Officia dolore culpa qui.  At aut maiores eligendi non alias. Quod laborum sed aspernatur ex molestiae  quisquam fugit rem.Aut aut veritatis nulla voluptatum expedita minus magni. Esse aperiam voluptate     quia delectus. Officiis omnis ea amet nesciunt. Sit veniam maiores saepe    consequatur vero voluptatum. Cumque non aspernatur quis eos necessitatibus quasi   ut. Officiis deserunt est illum iste molestiae suscipit illo.Reprehenderit sunt non soluta minima dolor tempore. Ipsam cum nihil veniam beatae   eos rerum consequatur. Et odit quos placeat corporis.Et autem fugiat quia modi exercitationem ea voluptatem. Quis qui reprehenderit sit  aperiam iusto. Id exercitationem esse similique iure natus. Sunt illum quod  explicabo sunt quam. Asperiores similique rerum porro. Mollitia aut sed ab dolore.";
}


(() => {
	'use strict';
  
	// before the DOM has loaded
	
	document.addEventListener('DOMContentLoaded', e => {
		// after the DOM has loaded
    demo()
	});
})();