export const constructPostLoanBody=(loan, baseString)=>{
    return {
        applicationDate:buildDateTimeString(),
        loanAmount:loan.loanAmount,
        tenureMonths:loan.tenure,
        employmentStatus:loan.employmentStatus,
        annualIncome:loan.annualIncome,
        remarks:loan.remarks,
        proof:baseString,
        // accountHolder:"",
        // accountNumber:"",
        // iFSCCode:"",
        // applicationStatus:""
    }
}

export const buildDateTimeString=()=>{
    const date=new Date();
    const year= date.getFullYear();
    const month=(date.getMonth()+1).toString().padStart(2,"0");
    const day=date.getDate().toString().padStart(2,"0");
    const hours=date.getHours().toString().padStart(2,"0");
    const minutes= date.getMinutes().toString().padStart(2,"0");
    const seconds= date.getSeconds().toString().padStart(2,"0");
    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`
}