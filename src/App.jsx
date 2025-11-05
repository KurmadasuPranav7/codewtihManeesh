import { useState } from 'react';
import './App.css';

export default function App() {
  const [percentage, setPercentage] = useState(75);
  const [present, setPresent] = useState('');
  const [total, setTotal] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const presentNum = parseInt(present) || 0;
    const totalNum = parseInt(total) || 0;

    if (totalNum === 0) {
      setResult({
        type: 'error',
        message: 'Total classes cannot be zero'
      });
      return;
    }

    const currentPercentage = (presentNum / totalNum) * 100;
    
    if (currentPercentage >= percentage) {
      const canMiss = Math.floor((100 * presentNum - percentage * totalNum) / percentage);
      setResult({
        type: 'success',
        message: `You have ${currentPercentage.toFixed(2)}% attendance.`,
        submessage: `You can miss ${canMiss} more ${canMiss === 1 ? 'class' : 'classes'}!`
      });
    } else {
      const requiredClasses = Math.ceil((percentage * totalNum - 100 * presentNum) / (100 - percentage));
      setResult({
        type: 'warning',
        message: `You need to attend ${requiredClasses} more ${requiredClasses === 1 ? 'class' : 'classes'}`,
        submessage: `to reach ${percentage}% attendance.`
      });
    }
  };

  return (
    <div className="app">

      <main className="main-content">
        <div className="container">
          <div className="hero-section">
            <h2>A "codewithManeesh" verison 😊</h2>
          </div>

          <div className="calculator-card">
            <div className="input-group">
              <label htmlFor="percentage">Percentage Required</label>
              <select 
                id="percentage"
                value={percentage}
                onChange={(e) => setPercentage(parseInt(e.target.value))}
                className="input-field select-field"
              >
                <option value="65">65%</option>
                <option value="70">70%</option>
                <option value="75">75%</option>
                <option value="80">80%</option>
                <option value="85">85%</option>
                <option value="90">90%</option>
                <option value="95">95%</option>
                <option value="100">100%</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="present">Present</label>
              <input
                type="number"
                id="present"
                value={present}
                onChange={(e) => setPresent(e.target.value)}
                placeholder="Number of classes attended"
                className="input-field"
                min="0"
              />
            </div>

            <div className="input-group">
              <label htmlFor="total">Total</label>
              <input
                type="number"
                id="total"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="Total number of classes"
                className="input-field"
                min="0"
              />
            </div>

            <button onClick={calculate} className="calculate-btn">
              Calculate
            </button>

            {result && (
              <div className={`result-card ${result.type}`}>
                <p className="result-message">{result.message}</p>
                {result.submessage && (
                  <p className="result-submessage">{result.submessage}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

    </div>
  );
}