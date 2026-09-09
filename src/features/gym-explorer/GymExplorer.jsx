import { useState } from 'react'

const mockGyms = [
  { id: 1, name: 'FitFlow Downtown', address: '123 Main St, Downtown', distance: '0.8 km', rating: 4.8, members: 342, gender: 'both', image: '🏋️', specialties: ['CrossFit', 'Yoga', 'Cardio'] },
  { id: 2, name: 'Iron District Gym', address: '456 Oak Ave, District 2', distance: '1.2 km', rating: 4.6, members: 215, gender: 'male', image: '💪', specialties: ['Weightlifting', 'Bodybuilding'] },
  { id: 3, name: 'Zen Studio', address: '789 Pine Rd, Uptown', distance: '1.5 km', rating: 4.9, members: 189, gender: 'female', image: '🧘', specialties: ['Yoga', 'Pilates', 'Meditation'] },
  { id: 4, name: 'Cardio Hub', address: '321 Elm St, Midtown', distance: '2.1 km', rating: 4.5, members: 420, gender: 'both', image: '🏃', specialties: ['HIIT', 'Running', 'Cycling'] },
  { id: 5, name: 'Power House Fitness', address: '654 Maple Dr, East Side', distance: '2.8 km', rating: 4.7, members: 298, gender: 'male', image: '🔥', specialties: ['Strength Training', 'Boxing'] },
  { id: 6, name: 'Flow Yoga Center', address: '987 Cedar Ln, West End', distance: '3.2 km', rating: 4.9, members: 156, gender: 'female', image: '🌸', specialties: ['Yoga', 'Barre', 'Dance'] },
  { id: 7, name: 'Apex Athletics', address: '147 Birch St, North Side', distance: '3.5 km', rating: 4.4, members: 512, gender: 'both', image: '⚡', specialties: ['CrossFit', 'Bootcamp', 'Athletics'] },
  { id: 8, name: 'Sculpt Studio', address: '258 Walnut Ave, South Quarter', distance: '4.1 km', rating: 4.8, members: 178, gender: 'female', image: '✨', specialties: ['Pilates', 'Barre', 'Core'] },
]

function GymExplorer({ onBack }) {
  const [location, setLocation] = useState('')
  const [gender, setGender] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [filteredGyms, setFilteredGyms] = useState([])

  function handleSubmit(event) {
    event.preventDefault()
    if (!location.trim() || !gender) return

    const filtered = mockGyms.filter((gym) => {
      const matchesLocation = gym.address.toLowerCase().includes(location.toLowerCase())
      const matchesGender = gym.gender === 'both' || gym.gender === gender
      return matchesLocation && matchesGender
    })

    setFilteredGyms(filtered)
    setSubmitted(true)
  }

  function handleReset() {
    setLocation('')
    setGender('')
    setSubmitted(false)
    setFilteredGyms([])
  }

  return (
    <section className="gym-explorer">
      <div className="gym-explorer-header">
        <button className="back-button" type="button" onClick={onBack}>
          <span aria-hidden="true">&lt;-</span> Back to FitFlow
        </button>
        <div className="gym-explorer-title">
          <p className="eyebrow">Find your gym</p>
          <h1>Explore nearby gyms</h1>
          <p>Enter your location to discover fitness studios in your area.</p>
        </div>
      </div>

      <form className="gym-search-form" onSubmit={handleSubmit}>
        <div className="gym-form-group">
          <label htmlFor="gym-location">Your location</label>
          <input
            id="gym-location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter city or area name"
            required
          />
        </div>

        <div className="gym-form-group">
          <label htmlFor="gym-gender">I am looking for a gym for</label>
          <div className="gender-options">
            <button
              type="button"
              className={`gender-option ${gender === 'male' ? 'active' : ''}`}
              onClick={() => setGender('male')}
            >
              <span className="gender-icon">♂</span>
              <span>Male</span>
            </button>
            <button
              type="button"
              className={`gender-option ${gender === 'female' ? 'active' : ''}`}
              onClick={() => setGender('female')}
            >
              <span className="gender-icon">♀</span>
              <span>Female</span>
            </button>
          </div>
        </div>

        <button className="gym-search-button" type="submit" disabled={!location.trim() || !gender}>
          Find gyms nearby <span aria-hidden="true">-&gt;</span>
        </button>
      </form>

      {submitted && (
        <div className="gym-results">
          <div className="gym-results-header">
            <h2>{filteredGyms.length} gyms found near {location}</h2>
            <button type="button" className="gym-reset-button" onClick={handleReset}>Search again</button>
          </div>

          {filteredGyms.length === 0 ? (
            <div className="gym-empty-state">
              <span className="gym-empty-icon">🔍</span>
              <h3>No gyms found</h3>
              <p>Try a different location or adjust your filters.</p>
            </div>
          ) : (
            <div className="gym-grid">
              {filteredGyms.map((gym) => (
                <article key={gym.id} className="gym-card">
                  <div className="gym-card-header">
                    <span className="gym-card-icon">{gym.image}</span>
                    <div className="gym-card-meta">
                      <span className={`gym-card-badge ${gym.gender}`}>{gym.gender === 'both' ? 'Unisex' : gym.gender === 'male' ? 'Men' : 'Women'}</span>
                      <span className="gym-card-distance">{gym.distance}</span>
                    </div>
                  </div>
                  <h3>{gym.name}</h3>
                  <p className="gym-card-address">{gym.address}</p>
                  <div className="gym-card-tags">
                    {gym.specialties.map((spec) => (
                      <span key={spec} className="gym-card-tag">{spec}</span>
                    ))}
                  </div>
                  <div className="gym-card-footer">
                    <div className="gym-card-rating">
                      <span>★</span> {gym.rating}
                    </div>
                    <span className="gym-card-members">{gym.members} members</span>
                  </div>
                  <button className="gym-card-button" type="button">View details <span aria-hidden="true">-&gt;</span></button>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default GymExplorer
