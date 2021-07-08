using AutoMapper;
using WebAPI.Data.Entities;
using WebAPI.Models;

namespace WebAPI.Map
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<UserModel, User>()
                .ForMember(x => x.Schedules, opt => opt.Ignore())
                .ForMember(x => x.Subjects, opt => opt.Ignore());

            CreateMap<SubjectModel, Subject>()
                .ForMember(x => x.Students, opt => opt.Ignore());
            
            CreateMap<ScheduleModel, Schedule>()
                .ForMember(x => x.Students, opt => opt.Ignore());
        }
    }
}