const Header = ({ filteredRates }) => {
  return (
    <div className="header">
      <div className="currency">
        {filteredRates.map((rate) => (
          <div key={rate.cc}>
            {rate.cc} = {rate.rate}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
