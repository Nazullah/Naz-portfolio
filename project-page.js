let projects=[{
  name:'calculator',
  description:'good app',

},
{
  name:'todo',
  description:'good app for todo'
},
{
  name:'khan',
  description:'nice'
}
];
let hero=document.querySelector('.hero-section');
projects.forEach(project => {
  hero.innerHTML+=`<div> name:${project.name} <br>discription:${project.description}</div>`;
});
