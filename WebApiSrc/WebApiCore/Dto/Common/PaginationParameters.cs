namespace WebApiCore.Dto.Common;

public class PaginationParameters
{
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public int GetSkip() => (PageNumber - 1) * PageSize;
}