var cir=document.querySelector('.circle')
var but=document.querySelector('button')
but.onclick=()=>{
	var dat=but.classList.contains('clicked')?'0':'1'
	but.classList.toggle('clicked')
	fetch('/mois',{
		method:'POST',
		headers:{
			'Content-Type':'application/json'
		},
		body:JSON.stringify({data:dat})
	}).then(res=>res.json())
	.then(data=>{
		var on=dat=='0'?'ON':'OFF'
		but.innerText="Turn "+on
		console.log('Pump turned',on)
	})
	.catch(err=>{
		console.error('Error:',err)
	})
}
setInterval(()=>{
//	console.log('fetching data..')
	fetch('/mois')
		.then(res=>{
			if(res.ok){
				res.json().then(out=>{
					var val=100-((out.data/1024)*100)
					var code=`
						<svg class="circle-cont"
							viewBox="2 -2 28 36"
							xmlns="http://www.w3.org/2000/svg">
							<circle class="circle-back"
							 r="16" cx="16" cy="16"></circle>
							<circle class="circle-prog"
								r="16"
								cx="16"
								cy="16"
								style="stroke-dashoffset:${val}"
							></circle>
							<text class="text"
							 x="11"
							 y="-8"
							>${out.data}</text>
						</svg>
					`
					cir.innerHTML=code
				})
			}
		})
},1000)
