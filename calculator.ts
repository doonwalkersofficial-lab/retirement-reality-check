export type Inputs = {
 currentAge:number; retirementAge:number; lifeExpectancy:number; monthlyIncome:number;
 monthlyExpenses:number; currentCorpus:number; monthlyInvestment:number;
 annualInflation:number; preRetirementReturn:number; postRetirementReturn:number;
 otherMonthlyIncome:number; oneTimeRetirementCosts:number; safetyBuffer:number;
};
const fv=(p:number,c:number,r:number,y:number)=>{const n=Math.max(0,Math.round(y*12)),m=r/12,g=Math.pow(1+m,n);return p*g+(Math.abs(m)<1e-9?c*n:c*(g-1)/m)};
const pv=(w:number,r:number,y:number)=>{const n=Math.max(1,Math.round(y*12)),m=r/12;return Math.abs(m)<1e-9?w*n:w*(1-Math.pow(1+m,-n))/m};
export function calculate(i:Inputs){
 const years=Math.max(0,i.retirementAge-i.currentAge), horizon=Math.max(1,i.lifeExpectancy-i.retirementAge);
 const futureExpense=i.monthlyExpenses*Math.pow(1+i.annualInflation,years);
 const futureOther=i.otherMonthlyIncome*Math.pow(1+i.annualInflation,years);
 const required=(pv(Math.max(0,futureExpense-futureOther),i.postRetirementReturn,horizon)+i.oneTimeRetirementCosts*Math.pow(1+i.annualInflation,years))*(1+i.safetyBuffer);
 const projected=fv(i.currentCorpus,i.monthlyInvestment,i.preRetirementReturn,years);
 const n=Math.round(years*12),m=i.preRetirementReturn/12,g=Math.pow(1+m,n);
 const factor=n===0?0:(Math.abs(m)<1e-9?n:(g-1)/m);
 const needed=n>0&&factor>0?Math.max(0,(required-i.currentCorpus*g)/factor):Math.max(0,required-i.currentCorpus*g);
 const scenarios=[["Conservative",Math.max(0,i.preRetirementReturn-.02),Math.max(0,i.postRetirementReturn-.015),i.annualInflation+.01],["Base",i.preRetirementReturn,i.postRetirementReturn,i.annualInflation],["Optimistic",Math.min(.18,i.preRetirementReturn+.02),Math.min(.12,i.postRetirementReturn+.01),Math.max(0,i.annualInflation-.005)]].map(([name,pre,post,infl])=>{const ex=i.monthlyExpenses*Math.pow(1+Number(infl),years),oi=i.otherMonthlyIncome*Math.pow(1+Number(infl),years),p=fv(i.currentCorpus,i.monthlyInvestment,Number(pre),years),r=(pv(Math.max(0,ex-oi),Number(post),horizon)+i.oneTimeRetirementCosts*Math.pow(1+Number(infl),years))*(1+i.safetyBuffer);return {name,projected:Math.round(p),required:Math.round(r),gap:Math.round(p-r)}});
 return {yearsToRetirement:years,retirementYears:horizon,futureMonthlyExpenses:Math.round(futureExpense),requiredCorpus:Math.round(required),projectedCorpus:Math.round(projected),gap:Math.round(projected-required),requiredMonthlyInvestment:Math.round(needed),scenarios,assumptions:{inflation:i.annualInflation,preReturn:i.preRetirementReturn,postReturn:i.postRetirementReturn,buffer:i.safetyBuffer,lifeExpectancy:i.lifeExpectancy}};
}