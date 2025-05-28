import React, { useEffect, useState } from 'react'
import './LoanForm.css'


const LoanForm = ({loan, onClose, onSubmit}) => {
  const[formData, setFormData] = useState({
    amount: "",
    intersetRate: "",
    term: "",
    
  });


  useEffect(() => {
    if(loan) {
      setFormData({
        amount: loan.amount,
        intersetRate: loan.intersetRate,
        term: loan.term,
      })
    }
  }, [loan]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev, [name]: value,
    }))
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.amount || !formData.intersetRate || !formData.term) {
      alert("please fill the data");
      return
    }

    const loanData = {
      ...formData, id: loan ? loan.id : undefined,
    }

    onSubmit(loanData);
  };
  
  return(

    <div>
      <div className="modal-content">
        <h1>{loan ? 'Edit Loan' : 'Add Loan'}</h1>
        <form onSubmit={handleSubmit} >
          <label htmlFor="amount">
            <input type="number" name="amount" id="amount"  value={formData.amount} onChange={handleChange}/>
          </label>
          <label htmlFor="interestrate">
            <input type="number" name="interestrate" id="interestrate"  value={formData.intersetRate} onChange={handleChange}/>
          </label>
          <label htmlFor="term">
            <input type="number" name="term" id="term"  value={formData.term} onChange={handleChange}/>
          </label>
          

        <div>
          <button type="submit">{loan ? 'Save Changes' : 'Add Loan'}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
        </form>
      </div>
    </div>
  );
}

export default LoanForm;