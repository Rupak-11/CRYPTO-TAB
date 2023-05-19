import React, { useEffect, useState } from 'react'
import { getNews } from "./api/news"
import { Link } from 'react-router-dom';
import logo from './Assets/logo.png'

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
    <div className="container text-center">

      <h1 className='text-light bg-primary rounded-pill my-3 p-2'> <img className='rounded mx-5' src={logo} alt="logo" style={{height:'35px', width:'45px'}} /> CRYPTO TAB <img className='rounded mx-5' src={logo} alt="logo" style={{height:'35px', width:'45px'}} /> </h1>
      <p className='fs-4 text-primary'>DAILY CRYPTO UPDATES AT ONE PLACE</p>

      <div className="container shadow-lg p-3 mb-5 bg-body rounded">
        <div className="row">
          {loading ? (<div className="spinner-border text-primary" role="status">
          </div>)
            : (
              <>
                {response &&
                  response.map(news => {
                    return (
                      <div className="col-md-4 my-3">
                        <div className="card p-2 border-2 border-primary" style={{ height: "60vh" }}>
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
                            <p className="mt-3 fs-4 fw-bold">
                              {news.HEADLINE}
                            </p>
                            <p className="mt-4 text-center">
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
  );
}

export default App;
