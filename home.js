console.log('homes here');
let allIssue = [];

const issueLoding = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
.then(res => res.json())
.then(json => {
    allIssue=json.data;
    displayIssues(allIssue);
});


}
// const showIssue = async(id) => {
//     spiner(true);

//     const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
//    // console.log(url);
//     const res = await fetch(url);
//     const show = await res.json();
//     spiner(false);

//     displayIssueShow(show.data);
// };


const displayIssueShow = (card)=> {
    //console.log(card);

    const issueInfoContainer = document.getElementById('issue-info-container');
    issueInfoContainer.innerHTML= `
    <div class="bg-base-100 rounded-xl p-8 space-y-4">
    <div>
        <h2 class="text-2xl font-bold text-[#1F2937]">${card.title}</h2>
        <div class="flex items-center gap-5">
            <button class="btn btn-success">${card.status}</button>
            <li class="text-[#64748B] text-xs">${card.assignee} Ahmed</li>
            <li class="text-[#64748B] text-xs">22/02/2026</li>
        </div>
    </div>
    <div>
         <button class="btn btn-outline btn-error rounded-full">BUG</button>
         <button class="btn btn-outline btn-warning rounded-full">HELP WANTED</button>
    </div>
    <div>
        <p class="text-[#64748B]"> ${card.description}</p>
    </div>

    <div class="bg-gray-100 rounded flex p-4 gap-2 ">
        <div class=" flex-1">
            <p class="text-[#64748B]">Assignee:</p>
            <h2 class="text-[#1F2937]">${card.assignee}</h2>
        </div>
        <div class="flex-1">
            <P class="text-[#64748B]">Priority:</P>
            <button class="btn btn-error">${card.priority}</button>

        </div>

    </div>

</div>

    
    `;

    document.getElementById('issue_modal').showModal()


}

const spiner = (status) =>{
    if(status == true){
       document.getElementById('loading').classList.remove('hidden'); 
       document.getElementById('issue-container').classList.add('hidden'); 
    }else{
        document.getElementById('loading').classList.add('hidden'); 
       document.getElementById('issue-container').classList.remove('hidden'); 

    }

}

const displayIssues = (issues) =>{
    //console.log(issues);
    spiner(false);
    // 1. get the container 
    document.getElementById("cardCount").innerText =issues.length;
    const issuescontainer=document.getElementById('issue-container');
    issuescontainer.innerHTML="";
    openContainer.innerHTML = "";
    closedContainer.innerHTML = "";
    // 2. show every single element
    issues.forEach(issue => {
        console.log(issue);

        // 3. create a chiled
    const createCard = document.createElement('div');
    createCard.className = `issue-card ${issue.status === 'open' ? 'border-t-4 border-green-500' : 'border-t-4 border-purple-500'}`;
    createCard.innerHTML=`
    <div onclick="showIssue(${issue.id})" class=" card bg-base-100 rounded-lg p-4 shadow-md space-y-3  h-full">
                <div class="flex justify-between">
                    <div >
                    <img src="./assets/${issue.status == "open" ? "Open-Status.png" : "Closed- Status .png"}" alt="">
                     
                </div>
                <div>
                    <button class="btn bg-red-300">${issue.priority }</button>
                </div>

                </div>
                <div>
                    <h2 class="font-semibold">${issue.title}</h2>
                    <p class="text-[#64748B]">${issue.description}</p>
                </div>
                <div>
                    <button class="btn btn-outline btn-error rounded-full">BUG</button>
                    <button class="btn btn-outline btn-warning rounded-full">HELP WANTED</button>
                </div>
                <div>
                    <p class="text-[#64748B]">${issue.author}</p>
                    <p class="text-[#64748B]">${issue.updatedAt}</p>
                </div>
            </div>
    
    `;
    if(issue.status === "open"){
            openContainer.appendChild(createCard);
        }else{
            closedContainer.appendChild(createCard);
        }

    // 4. append the chiled into the container
    issuescontainer.appendChild(createCard.cloneNode(true));
        
    });
    
}
let allActive = 'all';
const btnActive = ['btn-primary'];
const btnUnActive = ['btn-soft'];

const issueContainer = document.getElementById('issue-container');
const openContainer = document.getElementById('open-container');
const closedContainer = document.getElementById('closed-container');
console.log(issueContainer,openContainer,closedContainer)

const allSection = [issueContainer,openContainer,closedContainer];
const activeBtn = (active)=>{
    //console.log(active);

    let filteredIssues = [];
    if(active === "all") filteredIssues = allIssue;
    else if(active === "open") filteredIssues = allIssue.filter(i => i.status === "open");
    else filteredIssues = allIssue.filter(i => i.status === "closed");

    const btns = ['all','open','closed'];
    for (const btn of btns) {
        const btnName = document.getElementById("btn-" + btn);
        console.log(btnName);

        if( btn === active){
            allActive = btn;

            btnName.classList.remove(...btnUnActive);
            btnName.classList.add(...btnActive);
        }else {
            btnName.classList.add(...btnUnActive);
            btnName.classList.remove(...btnActive);
        
    }
 }
     displayIssues(filteredIssues);


 for (const section of allSection) {
    section.classList.add('hidden');
    
 }

 if(active === 'all'){
    issueContainer.classList.remove('hidden');

 }else if ( active === 'open'){
    openContainer.classList.remove('hidden')

 }else{
    closedContainer.classList.remove('hidden')
 }

}


activeBtn(allActive);
issueLoding();