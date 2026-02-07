import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdCalendarToday, MdAccessTime, MdPerson, MdEmail, MdPhone, MdDirectionsCar, MdLocationOn, MdCheckCircle, MdCancel, MdEdit, MdDelete, MdAdd, MdRefresh } from 'react-icons/md';
import { supabase } from '../lib/supabase';
import { formatPrice } from '../data/services';

function AdminDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' or 'availability'
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, confirmed, completed, cancelled
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('appointments')
        .select('*')
        .order('appointment_date', { ascending: true })
        .order('appointment_time', { ascending: true });

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      alert('Failed to load appointments. Make sure Supabase is configured.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch availability for selected date
  const fetchAvailability = async (date) => {
    try {
      const { data, error } = await supabase
        .from('availability_slots')
        .select('*')
        .eq('date', date)
        .order('time_slot', { ascending: true });

      if (error) throw error;

      // If no slots exist for this date, create default ones
      if (!data || data.length === 0) {
        const defaultSlots = timeSlots.map(time => ({
          date,
          time_slot: time,
          is_available: true
        }));

        const { data: inserted, error: insertError } = await supabase
          .from('availability_slots')
          .insert(defaultSlots)
          .select();

        if (insertError) throw insertError;
        setAvailability(inserted || []);
      } else {
        setAvailability(data);
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
      alert('Failed to load availability.');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [filterStatus]);

  useEffect(() => {
    if (activeTab === 'availability' && selectedDate) {
      fetchAvailability(selectedDate);
    }
  }, [activeTab, selectedDate]);

  // Update appointment status
  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', appointmentId);

      if (error) throw error;
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Failed to update appointment status.');
    }
  };

  // Toggle availability slot
  const toggleAvailability = async (slotId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('availability_slots')
        .update({ is_available: !currentStatus })
        .eq('id', slotId);

      if (error) throw error;
      fetchAvailability(selectedDate);
    } catch (error) {
      console.error('Error updating availability:', error);
      alert('Failed to update availability.');
    }
  };

  // Bulk create availability for date range
  const bulkCreateAvailability = async (startDate, endDate) => {
    try {
      const dates = [];
      const start = new Date(startDate);
      const end = new Date(endDate);

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d).toISOString().split('T')[0]);
      }

      const slots = [];
      dates.forEach(date => {
        timeSlots.forEach(time => {
          slots.push({
            date,
            time_slot: time,
            is_available: true
          });
        });
      });

      const { error } = await supabase
        .from('availability_slots')
        .upsert(slots, { onConflict: 'date,time_slot' });

      if (error) throw error;
      alert('Availability created successfully!');
      fetchAvailability(selectedDate);
    } catch (error) {
      console.error('Error creating availability:', error);
      alert('Failed to create availability.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-400 bg-green-400/10';
      case 'completed':
        return 'text-blue-400 bg-blue-400/10';
      case 'cancelled':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-yellow-400 bg-yellow-400/10';
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-white transition-colors duration-300 min-h-screen">
      <div className="layout-container flex h-full grow flex-col min-h-screen">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#362b2b]/50 px-6 md:px-20 py-6 max-w-[1200px] mx-auto w-full">
          <div className="flex items-center gap-4 text-white">
            <div className="size-6 text-[#a12b2b]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
              </svg>
            </div>
            <h2 className="text-white text-xl font-bold leading-tight tracking-tight uppercase">Rudy's Repair - Admin</h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 border border-[#362b2b] rounded-lg hover:bg-white/5 transition-all text-sm"
            >
              <MdArrowBack className="text-sm" />
              Back to Site
            </button>
          </div>
        </header>

        <main className="flex-1 py-8 px-6">
          <div className="max-w-[1400px] mx-auto">
            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-[#362b2b]">
              <button
                onClick={() => setActiveTab('appointments')}
                className={`px-6 py-3 text-sm font-bold tracking-[0.1em] uppercase transition-colors border-b-2 ${
                  activeTab === 'appointments'
                    ? 'border-[#a12b2b] text-white'
                    : 'border-transparent text-[#b5a1a1] hover:text-white'
                }`}
              >
                Appointments
              </button>
              <button
                onClick={() => setActiveTab('availability')}
                className={`px-6 py-3 text-sm font-bold tracking-[0.1em] uppercase transition-colors border-b-2 ${
                  activeTab === 'availability'
                    ? 'border-[#a12b2b] text-white'
                    : 'border-transparent text-[#b5a1a1] hover:text-white'
                }`}
              >
                Manage Availability
              </button>
            </div>

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-2xl font-bold">All Appointments</h3>
                  <div className="flex items-center gap-4">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="bg-[#1a1a1a] border border-[#362b2b] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#a12b2b]"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={fetchAppointments}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#362b2b] rounded-lg hover:bg-white/5 transition-all"
                    >
                      <MdRefresh />
                      Refresh
                    </button>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-12 text-[#b5a1a1]">Loading appointments...</div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-12 text-[#b5a1a1]">No appointments found.</div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-[#1a1a1a] border border-[#362b2b] rounded-lg p-6 hover:bg-[#1e1e1e] transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1 space-y-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="text-white text-lg font-medium">
                                    {formatDate(appointment.appointment_date)} at {appointment.appointment_time}
                                  </h4>
                                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(appointment.status)}`}>
                                    {appointment.status.toUpperCase()}
                                  </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                  <div className="flex items-center gap-2 text-[#b5a1a1]">
                                    <MdPerson />
                                    <span>{appointment.customer_name}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[#b5a1a1]">
                                    <MdEmail />
                                    <span>{appointment.customer_email}</span>
                                  </div>
                                  {appointment.customer_phone && (
                                    <div className="flex items-center gap-2 text-[#b5a1a1]">
                                      <MdPhone />
                                      <span>{appointment.customer_phone}</span>
                                    </div>
                                  )}
                                  {appointment.vehicle_model && (
                                    <div className="flex items-center gap-2 text-[#b5a1a1]">
                                      <MdDirectionsCar />
                                      <span>{appointment.vehicle_model}</span>
                                    </div>
                                  )}
                                  {appointment.address && (
                                    <div className="flex items-center gap-2 text-[#b5a1a1]">
                                      <MdLocationOn />
                                      <span>{appointment.address}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="border-t border-[#362b2b] pt-4">
                              <p className="text-[#b5a1a1] text-xs font-bold tracking-[0.1em] uppercase mb-2">Services</p>
                              <div className="space-y-1">
                                {Array.isArray(appointment.services) ? (
                                  appointment.services.map((service, idx) => (
                                    <div key={idx} className="flex justify-between text-sm">
                                      <span className="text-white">{service.name}</span>
                                      <span className="text-[#a12b2b] font-bold">{formatPrice(service.price)}</span>
                                    </div>
                                  ))
                                ) : (
                                  <span className="text-white text-sm">No services listed</span>
                                )}
                              </div>
                              <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#362b2b]">
                                <span className="text-white font-bold">Total</span>
                                <span className="text-[#a12b2b] text-xl font-bold">{formatPrice(appointment.total_price)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            {appointment.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors"
                                >
                                  <MdCheckCircle />
                                  Confirm
                                </button>
                                <button
                                  onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
                                >
                                  <MdCancel />
                                  Cancel
                                </button>
                              </>
                            )}
                            {appointment.status === 'confirmed' && (
                              <button
                                onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors"
                              >
                                Mark Complete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Availability Tab */}
            {activeTab === 'availability' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-2xl font-bold">Manage Availability</h3>
                  <div className="flex items-center gap-4">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="bg-[#1a1a1a] border border-[#362b2b] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#a12b2b]"
                    />
                    <button
                      onClick={() => fetchAvailability(selectedDate)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#362b2b] rounded-lg hover:bg-white/5 transition-all"
                    >
                      <MdRefresh />
                      Refresh
                    </button>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] border border-[#362b2b] rounded-lg p-6">
                  <h4 className="text-white text-lg font-medium mb-4">
                    {formatDate(selectedDate)}
                  </h4>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {timeSlots.map((time) => {
                      const slot = availability.find(s => s.time_slot === time);
                      const isAvailable = slot ? slot.is_available : true;
                      
                      return (
                        <button
                          key={time}
                          onClick={() => slot && toggleAvailability(slot.id, slot.is_available)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            isAvailable
                              ? 'bg-green-600/20 border-green-600 text-green-400 hover:bg-green-600/30'
                              : 'bg-red-600/20 border-red-600 text-red-400 hover:bg-red-600/30'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-lg font-bold">{time}</div>
                            <div className="text-xs mt-1">{isAvailable ? 'Available' : 'Booked'}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-[#1a1a1a] border border-[#362b2b] rounded-lg p-6">
                  <h4 className="text-white text-lg font-medium mb-4">Bulk Create Availability</h4>
                  <p className="text-[#b5a1a1] text-sm mb-4">
                    Create availability slots for a date range (all time slots will be set to available)
                  </p>
                  <div className="flex flex-col md:flex-row gap-4">
                    <input
                      type="date"
                      id="startDate"
                      className="bg-[#121212] border border-[#362b2b] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#a12b2b]"
                    />
                    <input
                      type="date"
                      id="endDate"
                      className="bg-[#121212] border border-[#362b2b] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#a12b2b]"
                    />
                    <button
                      onClick={() => {
                        const start = document.getElementById('startDate').value;
                        const end = document.getElementById('endDate').value;
                        if (start && end) {
                          bulkCreateAvailability(start, end);
                        } else {
                          alert('Please select both start and end dates');
                        }
                      }}
                      className="flex items-center justify-center gap-2 px-6 py-2 bg-[#a12b2b] hover:bg-[#a12b2b]/90 rounded-lg text-sm font-medium transition-colors"
                    >
                      <MdAdd />
                      Create Availability
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
