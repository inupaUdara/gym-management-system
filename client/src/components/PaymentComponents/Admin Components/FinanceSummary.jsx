const FinanceSum = () => {
  return (
    <div className=" justify-center flex-col items-center mx-auto">
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full md:w-780 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center shadow-lg hover:drop-shadow-xl mb-5">
        <div className="flex justify-between items-center self-center">
          <div>
            <p className="font-bold text-gray-400">Earnings</p>
            <p className="text-2xl">Rs.174,000.00</p>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="button"
            className="text-md w-undefined p-3 hover:drop-shadow-xl hover:bg-undefined"
            style={{
              backgroundColor: "rgb(3, 201, 215)",
              color: "white",
              borderRadius: "10px",
            }}
          >
            Download
          </button>
        </div>
      </div>
      <div className="flex m-3 flex-wrap justify-center gap-5 items-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl shadow-xl hover:drop-shadow-xl cursor-pointer">
          <button
            type="button"
            className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            style={{
              color: "rgb(3, 201, 215)",
              backgroundColor: "rgb(229, 250, 251)",
            }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm.05 10H4.77c.99-.5 2.7-1 4.23-1 .11 0 .23.01.34.01.34-.73.93-1.33 1.64-1.81-.73-.13-1.42-.2-1.98-.2-2.34 0-7 1.17-7 3.5V19h7v-1.5c0-.17.02-.34.05-.5zm7.45-2.5c-1.84 0-5.5 1.01-5.5 3V19h11v-1.5c0-1.99-3.66-3-5.5-3zm1.21-1.82c.76-.43 1.29-1.24 1.29-2.18a2.5 2.5 0 00-5 0c0 .94.53 1.75 1.29 2.18.36.2.77.32 1.21.32s.85-.12 1.21-.32z"></path>
            </svg>
          </button>
          <p className="mt-3">
            <span className="text-lg font-semibold">6</span>
            <span className="text-sm text-red-600 ml-2">-4%</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">Customers</p>
        </div>
        {/* Repeat the same pattern for other elements */}
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl shadow-xl hover:drop-shadow-xl cursor-pointer">
          <button
            type="button"
            className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            style={{
              color: "rgb(255, 244, 229)",
              backgroundColor: "rgb(254, 201, 15)",
            }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"></path>
            </svg>
          </button>
          <p className="mt-3">
            <span className="text-lg font-semibold">6</span>
            <span className="text-sm text-red-600 ml-2">-23%</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">Products</p>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl shadow-xl hover:drop-shadow-xl cursor-pointer">
          <button
            type="button"
            className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            style={{
              color: "rgb(228, 106, 118)",
              backgroundColor: "rgb(255, 244, 229)",
            }}
          >
            <svg
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" y1="20" x2="12" y2="10"></line>
              <line x1="18" y1="20" x2="18" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="16"></line>
            </svg>
          </button>
          <p className="mt-3">
            <span className="text-lg font-semibold">423,39</span>
            <span className="text-sm text-green-600 ml-2">+38%</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">Sales</p>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl shadow-xl hover:drop-shadow-xl cursor-pointer">
          <button
            type="button"
            className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            style={{
              color: "rgb(0, 194, 146)",
              backgroundColor: "rgb(235, 250, 242)",
            }}
          >
            <svg
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </button>
          <p className="mt-3">
            <span className="text-lg font-semibold">39,354</span>
            <span className="text-sm text-red-600 ml-2">-12%</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">Refunds</p>
        </div>

        {/* <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl shadow-xl hover:drop-shadow-xl cursor-pointer">
          <button
            type="button"
            className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            style={{
              color: "rgb(3, 201, 215)",
              backgroundColor: "rgb(229, 250, 251)",
            }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm.05 10H4.77c.99-.5 2.7-1 4.23-1 .11 0 .23.01.34.01.34-.73.93-1.33 1.64-1.81-.73-.13-1.42-.2-1.98-.2-2.34 0-7 1.17-7 3.5V19h7v-1.5c0-.17.02-.34.05-.5zm7.45-2.5c-1.84 0-5.5 1.01-5.5 3V19h11v-1.5c0-1.99-3.66-3-5.5-3zm1.21-1.82c.76-.43 1.29-1.24 1.29-2.18a2.5 2.5 0 00-5 0c0 .94.53 1.75 1.29 2.18.36.2.77.32 1.21.32s.85-.12 1.21-.32z"></path>
            </svg>
          </button>
          <p className="mt-3">
            <span className="text-lg font-semibold">45,768</span>
            <span className="text-sm text-green-600 ml-2">+87%</span>
          </p>
          <p className="text-sm text-gray-400 mt-1">Employees</p>
        </div> */}
      </div>
    </div>
  );
};

export default FinanceSum;
