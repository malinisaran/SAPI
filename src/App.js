import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import SAPILanding from './components/SAPI_P1_Landing';
import SAPIPreview from './components/SAPI_P2_preview';
import SAPIBriefing from './components/SAPI_P3_Briefing';
import SAPIDimIntro from './components/SAPI_P4_DimIntro';
import SAPIQuiz from './components/SAPI_P5_Quiz';
import SAPICalculating from './components/SAPI_P6_Calculating';
import SAPIResults from './components/SAPI_P7_Results';
import SAPIScorecard from './components/SAPI_P8_Scorecard';
import SAPIPeerComparison from './components/SAPI_P9_PeerComparison';
import SAPIRoadmap from './components/SAPI_P10_Roadmap';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Wrapper component to handle briefing navigation - resets dimension to 0
function BriefingWrapper({ setCurrentDimension }) {
  const navigate = useNavigate();
  
  const handleBegin = () => {
    setCurrentDimension(0); // Reset to dimension 1 when starting
    localStorage.removeItem('sapi_answers'); // Clear previous answers
    navigate('/dimintro');
  };
  
  return <SAPIBriefing onBegin={handleBegin} />;
}

// Wrapper component to handle dimension navigation
function DimIntroWrapper({ currentDimension, setCurrentDimension }) {
  const navigate = useNavigate();
  
  return (
    <SAPIDimIntro 
      currentIndex={currentDimension}
      onBegin={() => navigate('/quiz')}
      onBack={() => {
        if (currentDimension === 0) {
          navigate('/briefing');
        } else {
          setCurrentDimension(currentDimension - 1);
        }
      }}
    />
  );
}

// Wrapper component to handle quiz navigation
function QuizWrapper({ currentDimension, setCurrentDimension }) {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [assessmentResults, setAssessmentResults] = useState(null);
  
  const submitToApi = async (allAnswers) => {
    try {
      const { submitAssessment } = await import('./services/assessmentService');
      const answerArray = Object.entries(allAnswers).map(([questionId, data]) => ({
        question_id: parseInt(questionId.replace('Q', '')),
        selected_option: data.selectedOption
      }));
      const response = await submitAssessment(answerArray);
      if (response.success) {
        setAssessmentResults(response.data);
        return response.data;
      }
    } catch (error) {
      console.error('Assessment submission failed:', error);
      // Fallback: calculate locally
      return null;
    }
  };
  
  return (
    <SAPIQuiz 
      appState={{ currentDimension, answers }}
      setAppState={(newState) => {
        // Merge new answers with existing ones using functional update
        if (newState.answers) {
          setAnswers(prevAnswers => ({
            ...prevAnswers,
            ...newState.answers
          }));
        }
      }}
      setCurrentPage={async (page, finalAnswers) => {
        if (page === 'dimIntro') {
          setCurrentDimension(currentDimension + 1);
          navigate('/dimintro');
        } else if (page === 'calculating') {
          // Submit assessment before navigating
          const allAnswers = finalAnswers || answers;
          console.log('Submitting answers:', Object.keys(allAnswers).length, allAnswers);
          await submitToApi(allAnswers);
          navigate('/calculating', { state: { answers: allAnswers } });
        }
      }}
    />
  );
}

function App() {
  const [currentDimension, setCurrentDimension] = useState(0);

  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<SAPILanding />} />
          <Route path="/preview" element={<SAPIPreview />} />
          <Route path="/briefing" element={<BriefingWrapper setCurrentDimension={setCurrentDimension} />} />
          <Route 
            path="/dimintro" 
            element={<DimIntroWrapper 
              currentDimension={currentDimension} 
              setCurrentDimension={setCurrentDimension}
            />} 
          />
          <Route 
            path="/quiz" 
            element={<QuizWrapper 
              currentDimension={currentDimension}
              setCurrentDimension={setCurrentDimension}
            />} 
          />
          <Route path="/calculating" element={<SAPICalculating />} />
          <Route path="/results" element={<SAPIResults />} />
          <Route path="/scorecard" element={<SAPIScorecard />} />
          <Route path="/peercomparison" element={<SAPIPeerComparison />} />
          <Route path="/roadmap" element={<SAPIRoadmap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
