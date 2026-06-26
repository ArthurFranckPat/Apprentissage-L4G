// Widget quiz reutilisable. Usage : voir data-attributes dans le HTML.
// <div class="quiz" data-answer="1">
//   <div class="q">Question ?</div>
//   <button data-fb="explication">Reponse A</button>
//   <button data-fb="explication">Reponse B</button>
//   <div class="fb"></div>
// </div>
document.querySelectorAll('.quiz').forEach(function(q){
  var correct = parseInt(q.getAttribute('data-answer'),10);
  var btns = q.querySelectorAll('button');
  var fb = q.querySelector('.fb');
  btns.forEach(function(b,i){
    b.addEventListener('click',function(){
      btns.forEach(function(x){x.classList.remove('correct','wrong')});
      if(i===correct){ b.classList.add('correct'); }
      else { b.classList.add('wrong'); btns[correct].classList.add('correct'); }
      fb.textContent = b.getAttribute('data-fb') || '';
    });
  });
});
