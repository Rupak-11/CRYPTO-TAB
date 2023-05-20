import React, { useEffect, useState } from 'react'
import { getNews } from "./api/news"
import { Link } from 'react-router-dom';
import './App.css'

function App() {
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchNews = async () => {
    try {
      setLoading(true);
      const news = await getNews()
      setResponse(news);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [])

  return (
  <>
    <div className="container text-center">

      <h1 className='text-light bg-dark rounded-pill my-3 p-2 font'> CRYPTO TAB </h1>
      <p className='fs-4 text-dark'>DAILY CRYPTO UPDATES AT ONE PLACE</p>

      <div className="container shadow-lg p-3 mb-5 bg-body rounded gradient">
        <div className="row">
          {loading ? (<div className="spinner-border text-light text-center" role="status">
          </div>)
            : (
              <>
                {response &&
                  response.map(news => {
                    return (
                      <div className="col-md-4 my-3">
                        <div className="card p-2 border-2 border-dark" style={{ height: "66vh" }}>
                          <img
                            src={news.related_image_big}
                            className="rounded border border-dark" style={{ height: "25vh" }} alt='img' />
                          <Link
                            className="text-center" style={{ textDecoration: "none" }}
                            key={news.news_ID}
                            to={
                              news.news_link
                                ? news.news_link
                                : news.third_party_url
                            }
                          >
                            <p className="mt-3 fs-4 fw-bold text-dark">
                              {news.HEADLINE}
                            </p>
                            <p className="mt-4 text-center text-dark">
                              {news.news_provider_name}
                            </p>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </>
            )
          }

        </div>
      </div>
      {response && (
        <div className="flex flex-col my-4 justify-center">
          <button
            className="btn btn-primary btn-lg rounded-pill"
            onClick={() => {
              setPage(page + 1);
              getNews();
            }}
          >
            Load next page &rarr;
          </button>
        </div>
      )}
    </div>
  <footer className='row m-4'>
    <div className='col-md-6'>
    <h2 className='text-dark'>CRYPTO TAB</h2>
    <div className='row'>© 2023 Crypto Tab</div>
    </div>
    <div className='col-md-6 text-dark'>
          <h2>Developers</h2>
            <div className='row'>
            SK ELAF AHMED
            </div>
            <div className='row'>
            SUBHADEEP LAYEK
            </div>
            <div className='row'>
            RUPAK CHOWDHURY
            </div>
            <div className='row'>
            DOLAN SARKAR
            </div>
            <div className='row'>
            DRISAA DAS CHOUDHURY
            </div>
    </div>
  </footer>
  </>
  );
}

export default App;
